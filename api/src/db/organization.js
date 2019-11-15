async function getOrganization(org) {
    return {
        name: "McBane Enterprises",
        type: "Organization",
        title: "Director",
        logo: "https://robertsspaceindustries.com/media/2weountodg09pr/heap_infobox/MCBANE-Logo.png"
    }
}

module.exports = {
    getOrganization,
};