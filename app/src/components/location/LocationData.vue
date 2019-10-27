<!--

 "Daymar": {
            "id": 2,
            "name": "Daymar",
            "designation": "Stanton IIc",
            "description": "Dusty Moon",
            "type": "Sattelite",
            "subtype": "Moon",
            "parent": "Crusader",
            "habitable": 0,
            "msl": 295.5,
            "atmo": 29.5,
            "om_radius": 464.9,
            "sattelites": [],
            "POIs": [
                {
                    "id": 3,
                    "system": "Stanton",
                    "location": "Daymar",
                    "name": "Wolf Point",
                    "owner": "Unknown",
                    "type": "Mining",
                    "altitude": 0,
                    "coords": {"x":276.443536,"y":-9.384236,"z":103.100625},
                    "facilities": "",
                }
            ]
        },

-->

<template>
    <div id="location-data" class="location-data">
        <div class="location-info">
            <div class="location-name"><b>Location: {{ location.name }} </b> ({{ location.designation }})</div>
            <div class="location-type"><b>Type:</b> {{ location.type }}</div>
            <div class="location-hab"><b>Habitable:</b> {{ is_habitable }}</div>
            <div class="location-description-title"><b>Description:</b></div>
            <p class="location-description">{{ location.description }}</p>
            <div class="location-poi-title"><b>Points of Interest:</b></div>
            <p class="location-poi-list">
                <ul>
                    <li v-for="poi in location.POIs" :key="poi.id" class="location-poi-name">{{ poi.name }}</li>
                </ul>
            </p>
        </div>
          <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
    </div>
</template>

<script>
  export default {
    name: 'location-data',
    props: ["location"],
    data() {
        return {
            /*location: {
                id: 2,
                name: "Daymar",
                designation: "Stanton IIc",
                description: "Dusty Moon",
                type: "Sattelite",
                subtype: "Moon",
                parent: "Crusader",
                habitable: 0,
                msl: 295.5,
                atmo: 29.5,
                om_radius: 464.9,
                image: "images/logo.png",
                sattelites: [],
                POIs: [
                    {
                        id: 3,
                        system: "Stanton",
                        location: "Daymar",
                        name: "Wolf Point",
                        owner: "Unknown",
                        type: "Mining",
                        altitude: 0,
                        coords: {"x":276.443536,"y":-9.384236,"z":103.100625},
                        facilities: [],
                    }
                ]
            }*/
        }
    },
    methods: {
        
    },
    computed: {
        is_habitable: function() {
            if(this.habitable) {
                return "Yes"
            } else {
                return "No"
            }
        }
    }
  }
</script>

<style>
    .location-data {
        position: relative;
        display: flex;
        justify-content: space-between;
        text-align: left !important;
        margin: 10px;
        max-width: 300px;
        min-width: 200px;
        border: 1px solid grey;
        padding: 15px;
    }
    .location-info {
        display: flex;
        flex-direction: column;

    }
    .description {
        margin-left: 20px;
    }
    .location-image {
        position: relative;
        top: 0;
        right: 0;
        width: 300px;
        height: 300px;
        border: 1px solid black;
        margin: 5px;
    }
</style>