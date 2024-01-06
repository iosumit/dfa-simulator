let propertiesForm = document.getElementById('propertiesForm')
let propertyName = document.getElementById('input-name')
let propertyTransOnOption = document.getElementById('input-transistion-on-options')
let propertyTransStateOption = document.getElementById('input-transistion-state-options')
let inputNewInput = document.getElementById('input-new-input')
let showAddedTransistions = document.getElementById('show-added-transistions')
let showInputs = document.getElementById('show-inputs')
let propertiesSidebar = document.getElementById('propertiesSidebar')
propertiesSidebar.style.display = 'none';



function addNewState() {
    let n = new State(states.length+1);
    n.position = getRandomPosition()
    states.push(n);
}

function deleteState() {
    const index = states.indexOf(selectedState);
    if (index > -1) { 
        states.splice(index, 1); 
    }
}

function deleteInput(key) {
    const index = inputs.indexOf(key);
    if (index > -1) { 
        inputs.splice(index, 1); 
    }
    showAllInputs()
}

function showAllInputs() {
    let addedInputs = ""
    for (const ip of inputs) {
        addedInputs += `<li> <b>${ip}</b> <button onclick="deleteInput('${ip}')">DEL</button> </li>`;
    }
    showInputs.innerHTML = addedInputs;
}

function addNewInput() {
    if(inputNewInput.value!="" && !inputs.includes(inputNewInput.value)){
        inputs.push(inputNewInput.value)   
    }
    inputNewInput.value="";
    showAllInputs()
}

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