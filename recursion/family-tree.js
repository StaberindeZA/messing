class FamilyTree {
  constructor(value) {
    if (typeof value !== 'string' || typeof value === 'undefined') {
      throw new Error('You must provide a string value to FamilyTree');
    }
    this.value = value;
    this.children = [];
    this.depth = 0;
  }

  insert(member) {
    const newMember = new FamilyTree(member);
    newMember.depth = this.depth + 1;
    this.children.push(newMember);
  }

  familySize() {
    return 1 + this.children.length;
  }

  findMember(name) {
    if (this.value === name) {
      return this;
    }

    return this.children.find(child => {
      return child.findMember(name);
    });
  }

  //This method has been modified to also build the DOM.
  //Use this method to refresh the DOM.
  log() {
    let str = `<p>${'-'.repeat(this.depth * 2 + 2)} ${this.value}</p>\n`;

    //Find/Create the container for the relevant depth/generation.
    const currentContainer = findContainer(this.depth);
    //Create new Name node and add to current container.
    currentContainer.appendChild(addFamilyNode(this.value));
    
    //base case
    if (this.children.length === 0) {
      return str;
    }

    //recursive case
    this.children.forEach(child => {
      str += child.log();
    });

    return str;
  }

}

function addFamilyNode(name) {
  const famName = document.createElement('p');
  famName.innerText = name;
  famName.className = 'fam-name';

  return famName;
}

function findContainer(depth) {
  //Check DOM container for famContainer
  //If found return
  const allFamContainer = memberContainer.querySelectorAll('.form-container');
  let foundFamContainer = {};
  let nothing = '';

  allFamContainer.forEach(famContainer => famContainer.dataset.depth == depth ? foundFamContainer = famContainer : nothing ='');

  if(!(Object.entries(foundFamContainer).length === 0 && foundFamContainer.constructor === Object)) {
    return foundFamContainer
  } else {
    //If not found, create and add to container
    const famContainer = document.createElement('div');
    famContainer.className = 'form-container';
    famContainer.dataset.depth = depth;

    memberContainer.appendChild(famContainer);

    return famContainer;
  }

}

const state = {
  age: '',
  name: '',
};

let selectedNode = {
  age: '',
  name: 'Pop',
}

const rootEl = document.getElementById('root');

// Create Name Input
const nameContainer = document.createElement('div');
nameContainer.className = 'input-container';
const nameLabel = document.createElement('label');
nameLabel.for = 'name-input';
nameLabel.innerText = 'Name';
nameLabel.className = 'input-label';
const nameInput = document.createElement('input');
nameInput.id = 'name-input';
nameInput.className = 'form-input';
nameContainer.appendChild(nameLabel);
nameContainer.appendChild(nameInput);

// Create Age Input
const ageContainer = document.createElement('div');
ageContainer.className = 'input-container';
const ageLabel = document.createElement('label');
ageLabel.for = 'age-input';
ageLabel.innerText = 'Age';
ageLabel.className = 'input-label';
const ageInput = document.createElement('input');
ageInput.className = 'form-input';
ageInput.id = 'age-input';
ageContainer.appendChild(ageLabel);
ageContainer.appendChild(ageInput);

// Error Text
const errorText = document.createElement('span');
errorText.className = 'error-text';
errorText.innerText = 'Age must be a number';

// Create Submission
const submit = document.createElement('button');
submit.className = 'form-button';
submit.innerText = 'Add Member';
const container = document.createElement('div');
container.className = 'form-container';
const memberContainer = document.createElement('div');
memberContainer.className = 'member-container';

// Events
// Grab Age from Input Field and Store
ageInput.onchange = e => {
  state.age = e.target.value;

  errorText.style.visibility = 'hidden';
  errorText.style.height = 0;
};

// Grab Name from Input Field and Store
nameInput.onchange = e => {
  state.name = e.target.value;
};

// On Click Do Something Important
submit.onclick = () => {
  const ageAsNum = parseInt(state.age);

  if (!isNaN(ageAsNum)) {
    console.log(szwajkowskis);
    const currentNode = szwajkowskis.findMember(selectedNode.name);
    currentNode.insert(state.name);
    memberContainer.innerHTML = '';
    szwajkowskis.log();
    console.log(`${state.name} is ${state.age}, adding now!`);
    state.age = '';
    state.name = '';
    nameInput.value = state.name;
    ageInput.value = state.age;

    //Add family members on click.
    //if(!Object.keys(rootFamily).length) {

  } else {
    console.error(`Error adding ${state.name} age ${state.age}. ${state.age} is not a number.`);
    errorText.style.visibility = 'visible';
    errorText.style.height = 'auto';
  }

};

// Append to DOM
container.appendChild(nameContainer);
container.appendChild(ageContainer);
container.appendChild(errorText);
container.appendChild(submit);

rootEl.appendChild(container);
rootEl.appendChild(memberContainer);

// const container = document.querySelector('.container');

const szwajkowskis = new FamilyTree('Pop');

szwajkowskis.insert('Mike');
szwajkowskis.insert('Amy');
szwajkowskis.insert('Todd');

const mikesFamily = szwajkowskis.findMember('Mike');

mikesFamily.insert('Eliot');
mikesFamily.insert('Elise');
mikesFamily.insert('Cas');
mikesFamily.insert('George');
mikesFamily.insert('Lear');

const amysFamily = szwajkowskis.findMember('Amy');

amysFamily.insert('Henry');
amysFamily.insert('Vivian');

selectedNode.name = 'Todd';

const log = szwajkowskis.log();
// console.log(`${log}`);
console.log(log);

// container.appendChild(createGenerationContainer(0));
// container.appendChild(createGenerationContainer(1));

// console.log(findContainer(2));
//container.innerHTML = log;
//const tempBuild = (buildDisplay(szwajkowskis,0));

// module.exports = FamilyTree;
