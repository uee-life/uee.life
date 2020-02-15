<template>
    <main-panel title="Geolocate">
        <form @submit.prevent="compute">
            <div>Select System:
            <select v-model="system">
                <option v-for="sys in systems" :key="sys.id" :value="sys.name">{{ sys.name }}</option>
            </select></div>
            <div>Select Location: 
            <select v-model="bounds">
                <option v-for="loc in locations" :key="loc.id" :value="loc.om_radius * 2">{{ loc.name }}</option>
            </select></div>
            <div>Bounds <input type=text v-model="bounds"></div>
            <div>OM1: <input type=text v-model="ranges.om1"></div>
            <div>OM2: <input type=text v-model="ranges.om2"></div>
            <div>OM3: <input type=text v-model="ranges.om3"></div>
            <div>OM4: <input type=text v-model="ranges.om4"></div>
            <div>OM5: <input type=text v-model="ranges.om5"></div>
            <div>OM6: <input type=text v-model="ranges.om6"></div>
            <div>Coordinates: {{ coordinates }}</div>
            <button type="submit">Compute</button>
        </form>
    </main-panel>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            location: {
                radius: 0,
            },
            ranges: {
                om1: 455.5,
                om2: 631.0,
                om3: 747.5,
                om4: 214.6,
                om5: 541.5,
                om6: null
            },
            markers: [],
            systems: null,
            system: null,
            locations: [
                { id: 322, name: 'Daymar', om_radius: '464.5', msl: 296 },
                { id: 1, name: 'Microtech', om_radius: '1439', msl: 439.5 }
            ],
            bounds: 929,
            offsets: {
                om1: [0.5, 0.5, 1],
                om2: [0.5, 0.5, 0],
                om3: [0, 0.5, 0.5],
                om4: [1, 0.5, 0.5],
                om5: [0.5, 0, 0.5],
                om6: [0.5, 1, 0.5]
            },
            coords: null
        }
    },
    computed: {
        coordinates() {
            if (this.coords) {
                return this.fix_loc(this.coords)
            } else {
                return "none"
            }
        }
    },
    methods: {
        check_ranges() {

        },
        init_markers() {
            let tmp = null
            this.markers = []
            for(var d in this.ranges) {
                if(this.ranges[d] && this.markers.length < 3) {
                    const marker = {
                        name: d,
                        x: this.offsets[d][0] * this.bounds,
                        y: this.offsets[d][1] * this.bounds,
                        z: this.offsets[d][2] * this.bounds,
                        range: parseFloat(this.ranges[d])
                    }
                    if(['om1', 'om2'].includes(d)) {
                        tmp = marker
                    } else {
                        this.markers.push(marker)
                    }
                }
            }
            this.markers.push(tmp)
        },
        distance(A, B) {
            const ABx = B.x - A.x
            const ABy = B.y - A.y
            const AB = Math.sqrt(ABx * ABx + ABy * ABy)
            return AB
        },
        computeCircles() {
            const A = this.markers[0]
            const B = this.markers[1]
            const C = this.markers[2]

            const ABx = B.x - A.x
            const ABy = B.y - A.y

            const BCx = C.x - B.x
            const BCy = C.y - B.y

            const CAx = A.x - C.x
            const CAy = A.y - C.y

            const AB = Math.sqrt(ABx * ABx + ABy * ABy)
            const BC = Math.sqrt(BCx * BCx + BCy * BCy)
            const CA = Math.sqrt(CAx * CAx + CAy * CAy)

            if (AB === 0 || BC === 0 || CA === 0) {
                console.error('oops')
                return
            }

            // X-Distance of two circle intersections from origin
            const xa = (A.range * A.range + AB * AB - B.range * B.range) / (2 * AB)
            const xb = (B.range * B.range + BC * BC - C.range * C.range) / (2 * BC)
            const xc = (C.range * C.range + CA * CA - A.range * A.range) / (2 * CA)

            // Y-Distance of two circle intersections from origin
            var ya = A.range * A.range - xa * xa
            var yb = B.range * B.range - xb * xb
            var yc = C.range * C.range - xc * xc

            if (ya < 0) {
                console.error('Circle A has no intersections')
                return
            }
            if (yb < 0) {
                console.error('Circle B has no intersections')
                return
            }
            if (yc < 0) {
                console.error('Circle C has no intersections')
                return
            }
            
            // for unit vectors
            if (ya > 0 || yb > 0 || yc > 0) {
                ya = Math.sqrt(ya)
                yb = Math.sqrt(yb)
                yc = Math.sqrt(yc)
            }


            // unit vectors
            var exa = ABx / AB;
            var exb = BCx / BC;
            var exc = CAx / CA;

            var eya = ABy / AB;
            var eyb = BCy / BC;
            var eyc = CAy / CA;

            /// normal vectors
            var nxa = -eya;
            var nxb = -eyb;
            var nxc = -eyc;

            var nya = exa;
            var nyb = exb;
            var nyc = exc;

            // calculate X and Y
            var Q1xa = A.x + xa * exa;
            var Q1xb = B.x + xb * exb;
            var Q1xc = C.x + xc * exc;

            var Q1ya = A.y + xa * eya;
            var Q1yb = B.y + xb * eyb;
            var Q1yc = C.y + xc * eyc;
            console.log(Q1xa)

            // if there is only one intersection...
            if (ya === 0 || yb === 0 || yc === 0) {
                return [
                    {x: Q1xa, y: Q1ya},
                    {x: Q2xa, y: Q2ya},
                    {x: Q1xb, y: Q1yb},
                    {x: Q2xb, y: Q2yb},
                    {x: Q1xc, y: Q1yc},
                    {x: Q2xc, y: Q2yc},
                    {x: yamax, y: yamin},
                    {x: ybmax, y: ybmin},
                    {x: ycmax, y: ycmin}
                ]
            } else {
                var Q2xa = Q1xa - ya * nxa;
                var Q2xb = Q1xb - yb * nxb;
                var Q2xc = Q1xc - yc * nxc;

                var Q2ya = Q1ya - ya * nya;
                var Q2yb = Q1yb - yb * nyb;
                var Q2yc = Q1yc - yc * nyc;

                Q1xa += ya * nxa;
                Q1xb += yb * nxb;
                Q1xc += yc * nxc;

                Q1ya += ya * nya;
                Q1yb += yb * nyb;
                Q1yc += yc * nyc;

                //Geradengleichungen für Schnittpunkte
                var ka = (Q2ya - Q1ya) / (Q2xa - Q1xa);
                var da = Q2ya - (ka * Q2xa);
                var yamax = ka * this.bounds + da;
                var yamin = ka * 0 + da;

                var kb = (Q2yb - Q1yb) / (Q2xb - Q1xb);
                var db = Q2yb - (kb * Q2xb);
                var ybmax = kb * this.bounds + db;
                var ybmin = kb * 0 + db;

                var kc = (Q2yc - Q1yc) / (Q2xc - Q1xc);
                var dc = Q2yc - (kc * Q2xc);
                var ycmax = kc * this.bounds + dc;
                var ycmin = kc * 0 + dc;

                 return [
                    {x: Q1xa, y: Q1ya},
                    {x: Q2xa, y: Q2ya},
                    {x: Q1xb, y: Q1yb},
                    {x: Q2xb, y: Q2yb},
                    {x: Q1xc, y: Q1yc},
                    {x: Q2xc, y: Q2yc},
                    {x: yamax, y: yamin},
                    {x: ybmax, y: ybmin},
                    {x: ycmax, y: ycmin}
                ]
            }
        },
        computeLines(c) {
            console.log(c)
            const s1a = c[0]
            const s2a = c[1]
            const s1b = c[2]
            const s2b = c[3]
            const s1c = c[4]
            const s2c = c[5]

            // directional vectors between Q1 and Q2 A
            const vecA_x = s1a.x - s2a.x
            const vecA_y = s1a.y - s2a.y
            const vecAB_x = s1a.x - s1b.x
            const vecAB_y = s1a.y - s1b.y

            const vecB_x = s1b.x - s2b.x
            const vecB_y = s1b.y - s2b.y
            const vecBC_x = s1b.x - s1c.x
            const vecBC_y = s1b.y - s1c.y
            
            const vecC_x = s1c.x - s2c.x
            const vecC_y = s1c.y - s2c.y
            const vecCA_x = s1c.x - s1a.x
            const vecCA_y = s1c.y - s1a.y

            // unit vectors
            const vecA = Math.sqrt((vecA_x * vecA_x) + (vecA_y * vecA_y))
            const exa = vecA_x / vecA
            const eya = vecA_y / vecA

            const vecB = Math.sqrt((vecB_x * vecB_x) + (vecB_y * vecB_y))
            const exb = vecB_x / vecB
            const eyb = vecB_y / vecB

            const vecC = Math.sqrt((vecC_x * vecC_x) + (vecC_y * vecC_y))
            const exc = vecC_x / vecC
            const eyc = vecC_y / vecC

            // normal vectors
            const normA_x = -eya
            const normA_y = exa

            const normB_x = -eyb
            const normB_y = exb

            const normC_x = -eyc
            const normC_y = exc

            let qx = vecAB_x * exa + vecAB_y * eya
            let qy = vecAB_x * normA_x + vecAB_y * normA_y

            let sx = exb * exa + eyb * eya
            let sy = exb * normA_x + eyb * normA_y

            let a = qx - qy * (sx / sy)

            const xab = s1a.x - a * exa
            const yab = s1a.y - a * eya

            qx = vecBC_x * exb + vecBC_y * eyb
            qy = vecBC_x * normB_x + vecBC_y * normB_y

            sx = exc * exb + eyc * eyb
            sy = exc * normB_x + eyc * normB_y

            a = qx - qy * (sx / sy)

            const xbc = s1b.x - a * exb
            const ybc = s1b.y - a * eyb

            qx = vecCA_x * exc + vecCA_y * eyc
            qy = vecCA_x * normC_x + vecCA_y * normC_y

            sx = exa * exc + eya * eyc
            sy = exa * normC_x + eya * normC_y

            a = qx - qy * (sx / sy)

            const xca = s1c.x - a * exc
            const yca = s1c.y - a * eyc

            console.log('x ranges:', xca, xbc, xab)
            console.log('y ranges:', yca, ybc, yab)

            const loc = {
                x: this.round((xab + xbc + xca) / 3),
                y: this.round((yab + ybc + yca) / 3),
                z: 0
            }

            return loc
            
        },
        computeZ(loc) {
            const center = this.bounds / 2
            let xlen = 0
            let ylen = 0
            if(loc.x < center) {
                xlen = center - loc.x
            } else {
                xlen = loc.x - center
            }

            if (loc.y < center) {
                ylen = center - loc.y
            } else {
                ylen = loc.y - center
            }

            const len_a = Math.sqrt(xlen * xlen + ylen * ylen)
            const len_h = this.markers[3].range
            const len_b = Math.sqrt(len_h * len_h - len_a * len_a)

            loc['z'] = this.round(this.bounds - len_b)
            return loc
        },
        round(num) {
            return Math.round((num + Number.EPSILON) * 1000000) / 1000000
        },
        fix_loc(loc) {
            const offset = this.bounds / 2
            const _loc = {
                x: loc.x - offset,
                y: loc.y - offset,
                z: loc.z - offset
            }
            return _loc
        },
        compute() {
            console.log("computing...")
            this.init_markers()
            const c = this.computeCircles()
            if(c) {
                const l = this.computeLines(c)
                if (l) {
                    this.coords = this.computeZ(l)
                    console.log('distance to OM1', this.getDistance(l, {
                        x: 464.5,
                        y: 464.5,
                        z: 929,
                    }))
                } else {
                    this.$swal('error', 'Error computing coordinates, check distances...', 'error')
                    this.coords = null
                }
            } else {
                this.$swal('error', 'Error computing coordinates, check distances...', 'error')
                this.coords = null
            }
        },
        getDistance(a, b) {
            var x = b.x - a.x
            var y = b.y - a.y
            var d = Math.sqrt(x * x + y * y)
            console.log(a.z, b.z)
            let z = null
            if(a.z > b.z) {
                z = b.z
            } else {
                z = a.z
            }
            return Math.sqrt(d * d + z * z)
        },
        loadSystems() {
            axios({
                url: 'https://api.uee.life/systems',
                method: 'GET'
            }).then((res) => {
                this.systems = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        loadLocations() {
            if(this.system) {
                axios({
                    url: `https://api.uee.life/systems/${this.system.name}/planets`,
                    method: 'GET'
                }).then((res) => {
                    this.data.locations = res.data
                    if(this.home.location) {
                        this.location = this.home.location
                    } else {
                        this.location = null
                    }
                }).catch((err) => {
                    console.error(err)
                })
            }
        }
    },
    mounted() {
        this.loadSystems()
    }
}
</script>

<style>

</style>