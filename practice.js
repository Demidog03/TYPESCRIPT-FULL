"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        // why validatableInput.minLength != null not just validatableInput.minLength
        // because validatableInput.minLength could be 0, and 0 is falsy value,
        // so we need to check if it is null or undefined, ignoring 0
        // != null -> means that not null and not undefined together
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    return isValid;
}
//AUTOBIND
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    return {
        enumerable: false,
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };
}
//STATE BASE CLASS
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
// PROJECT STATE CLASS
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["active"] = "active";
    ProjectStatus["finished"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
var ProjectTypes;
(function (ProjectTypes) {
    ProjectTypes["active"] = "active";
    ProjectTypes["finished"] = "finished";
})(ProjectTypes || (ProjectTypes = {}));
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject({ title, description, numOfPeople, status }) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            numOfPeople,
            status
        };
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(id, newStatus) {
        for (const project of this.projects) {
            if (project.status === newStatus) {
                return;
            }
            if (project.id === id) {
                project.status = newStatus;
            }
        }
        this.updateListeners();
    }
    updateListeners() {
        for (const listener of this.listeners) {
            listener(this.projects.slice()); // slice to get the copy of an array
        }
    }
}
const projectState = ProjectState.getInstance();
//COMPONENT BASE CLASS
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}
// PROJECT ITEM CLASS
class ProjectItem extends Component {
    get persons() {
        if (this.project.numOfPeople === 1) {
            return '1 person';
        }
        else {
            return `${this.project.numOfPeople} persons`;
        }
    }
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + ' assigned';
        this.element.querySelector("p").textContent = this.project.description;
    }
    dragStartHandler(event) {
        var _a;
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
        this.element.style.opacity = '0.4';
    }
    dragEndHandler(event) {
        this.element.style.opacity = '1';
    }
}
__decorate([
    Autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    Autobind
], ProjectItem.prototype, "dragEndHandler", null);
// PROJECT LIST CLASS
// interface ListInnerElement {
//   text: string
//   content: string
//   tagName: string
// }
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects) => {
            this.assignedProjects = projects.filter(prj => {
                if (this.type === ProjectTypes.active) {
                    return prj.status === ProjectStatus.active;
                }
                else {
                    return prj.status === ProjectStatus.finished;
                }
            });
            this.renderProjects();
        });
    }
    dragOverHandler(event) {
        var _a;
        if (((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === 'text/plain') {
            event.preventDefault(); // by default drop is not allowed
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        var _a;
        const prjId = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/plain');
        if (prjId) {
            projectState.moveProject(prjId, this.type === ProjectTypes.active ? ProjectStatus.active : ProjectStatus.finished);
        }
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    renderContent() {
        this.element.querySelector('ul').id = `${this.type}-project-list`;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`);
        listEl.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(listEl.id, project);
            // const listItem = document.createElement('li')
            // listItem.innerText = project.title
            // // const innerElements: ListInnerElement[] = [
            // //   {
            // //     text: 'Title:',
            // //     content: project.title,
            // //     tagName: 'p'
            // //   },
            // //   {
            // //     text: 'Description:',
            // //     content: project.description,
            // //     tagName: 'p'
            // //   },
            // //   {
            // //     text: 'Status:',
            // //     content: project.status,
            // //     tagName: 'p'
            // //   },
            // //   {
            // //     text: 'Number of people:',
            // //     content: project.numOfPeople.toString(),
            // //     tagName: 'p'
            // //   },
            // // ]
            // // for (const innerElement of innerElements) {
            // //   const el = document.createElement(innerElement.tagName)
            // //   el.innerText = innerElement.text + " " + innerElement.content
            // //   listItem.appendChild(el)
            // // } // My approach
            // listEl.appendChild(listItem)
        }
    }
}
__decorate([
    Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dragLeaveHandler", null);
// PROJECT INPUT CLASS
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1
        };
        if (!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)) {
            alert('Invalid input, please try again');
            return null;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (userInput) {
            const [title, description, people] = userInput;
            projectState.addProject({ title, description, numOfPeople: people, status: ProjectStatus.active });
            this.clearInput();
        }
    }
    clearInput() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList(ProjectTypes.active);
const finishedPrjList = new ProjectList(ProjectTypes.finished);
//# sourceMappingURL=practice.js.map