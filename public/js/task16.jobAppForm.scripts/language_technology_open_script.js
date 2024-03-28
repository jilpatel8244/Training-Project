function languageOpen(id) {
    let element = document.getElementById(id);

    let slicedLangName = id.slice(9,id.length);

    document.getElementById(`expertise_read_${slicedLangName}`).disabled = !element.checked;
    document.getElementById(`expertise_write_${slicedLangName}`).disabled = !element.checked;
    document.getElementById(`expertise_speak_${slicedLangName}`).disabled = !element.checked;
}
function technologiesopen(id) {
    let element = document.getElementById(id);

    let slicedTechName = id.slice(13);
    
    document.getElementById(`technologies_expertise_${slicedTechName}_b`).disabled = !element.checked;
    document.getElementById(`technologies_expertise_${slicedTechName}_m`).disabled = !element.checked;
    document.getElementById(`technologies_expertise_${slicedTechName}_e`).disabled = !element.checked;
}