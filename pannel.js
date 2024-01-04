let propertiesForm = document.getElementById('propertiesForm')
let propertyName = document.getElementById('input-name')
let propertyTransOnOption = document.getElementById('input-transistion-on-options')
let propertyTransStateOption = document.getElementById('input-transistion-state-options')
let showAddedTransistions = document.getElementById('show-added-transistions')
let propertiesSidebar = document.getElementById('propertiesSidebar')
propertiesSidebar.style.display = 'none';

function onStateSelect() {
    propertiesSidebar.style.display = 'block';
    propertyName.value = selectedState.name;
    propertyTransOnOption.innerHTML = inputs.map(e => `<option value='${e}'> ${e} </option>`)
    propertyTransStateOption.innerHTML = states.map(e => `<option value='${e.name}'> ${e.name} </option>`)
    
    let addedTransistions = ""
    for (const [on, edge] of selectedState.transition) {
        addedTransistions += `<li> on <b>${on}</b> to state <b>${edge.state.name}</b> <button onclick="deleteTransistion('${on}')">DEL</button> </li>`;
    }
    console.log(addedTransistions)
    showAddedTransistions.innerHTML = addedTransistions
}

function onStateReleased() {
    propertiesSidebar.style.display = 'none';
}

function changeName() {
    if (propertyName.value)
        selectedState.name = propertyName.value;
}

let onTransistionInput = null;
let toTransistionState = null;

function onTransistionSelect() {
    if(inputs.includes(propertyTransOnOption.value)){
        onTransistionInput = propertyTransOnOption.value
    }
    toTransistionState = states.find(e=> e.name == propertyTransStateOption.value)
}

function addTransistion() {
    if(onTransistionInput!=null && toTransistionState!=null){
        selectedState.addTransistion(onTransistionInput, toTransistionState)
        onTransistionInput = null;
        toTransistionState = null;
        onStateSelect()
    }
}
function deleteTransistion(on) {
    selectedState.deleteTransistion(on)
    onStateSelect()
}