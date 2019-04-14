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

  findMember(member) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].value === member) {
        return this.children[i];
      }
    }
    return undefined;
  }

  log() {
    let str = `${'-'.repeat(this.depth * 2 + 2)} ${this.value}\n`;

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

  log2() {
    let str =  `${'-'.repeat(this.depth * 2 + 2)} ${this.value}\n`;
    let tempStr = '';

    if(this.children.length === 0 ) {
      return str;
    } else {
      // tempStr = this.children.forEach(child => {
      //   child.log2();
      // });

      for(let i=0; i < this.children.length; i++)
      {
        tempStr += this.children[i].log2();
      }
      console.log(tempStr);
      str = str + tempStr;
      return str;
    }
    
  }
}

function createGenerationContainer(depth) {
  const famContainer = document.createElement('div');
  famContainer.className = 'form-container';
  famContainer.dataset.depth = '1'

  famContainer.appendChild(addFamilyNode('name'));

  return famContainer;
}

function addFamilyNode(name) {
  const famName = document.createElement('p');
  famName.innerText = name;
  famName.className = 'fam-name';

  return famName;
}

function buildDisplay(currentNode, depth) {

  const memberContainer = createGenerationContainer(depth);
  memberContainer.appendChild(addFamilyNode(currentNode.name));

  if(currentNode.children.length === 0) {
    return memberContainer;
  } else {
    currentNode.children.forEach( child => {
      buildDisplay(child, depth + 1);
    })
  }

}

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

// const amysFamily = szwajkowskis.findMember('Amy');

// amysFamily.insert('Henry');
// amysFamily.insert('Vivian');

const log = szwajkowskis.log();
//console.log(`${log}`);

const container = document.querySelector('.container');

container.innerHTML = '';
const tempBuild = (buildDisplay(szwajkowskis,0));

// module.exports = FamilyTree;
