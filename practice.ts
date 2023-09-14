//DRAG & DROP
interface Draggable {
  dragStartHandler: (event: DragEvent) => void
  dragEndHandler: (event: DragEvent) => void
}
interface DragTarget {
  dragOverHandler: (event: DragEvent) => void
  dropHandler: (event: DragEvent) => void
  dragLeaveHandler: (event: DragEvent) => void
}

//VALIDATION
interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}
function validate(validatableInput: Validatable) {
  let isValid = true
  if (validatableInput.required){
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    // why validatableInput.minLength != null not just validatableInput.minLength
    // because validatableInput.minLength could be 0, and 0 is falsy value,
    // so we need to check if it is null or undefined, ignoring 0
    // != null -> means that not null and not undefined together
    isValid = isValid && validatableInput.value.length > validatableInput.minLength
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLength
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number'){
    isValid = isValid && validatableInput.value < validatableInput.max
  }
  return isValid
}

//AUTOBIND
function Autobind(_: any, _2: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value

  return {
    enumerable: false,
    configurable: true,
    get() {
      return originalMethod.bind(this)
    }
  }
}

//STATE BASE CLASS
class State<T> {
  protected listeners: Listener<T>[] = []

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

// PROJECT STATE CLASS
enum ProjectStatus {
  active = 'active',
  finished = 'finished'
}
enum ProjectTypes {
  active = 'active',
  finished = 'finished'
}
type Listener<T> = (items: T[]) => void
interface Project {
  id: string
  title: string
  description: string
  numOfPeople: number
  status: ProjectStatus
}
class ProjectState extends State<Project>{
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance){
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }
  addProject({title, description, numOfPeople, status}: Omit<Project, 'id'>) {
    const newProject = {
      id: Math.random().toString(),
      title,
      description,
      numOfPeople,
      status
    }
    this.projects.push(newProject)
    this.updateListeners()
  }
  moveProject(id: string, newStatus: ProjectStatus) {
    for (const project of this.projects) {
      if(project.status === newStatus){
        return
      }
      if(project.id === id){
        project.status = newStatus
      }
    }
    this.updateListeners()
  }
  private updateListeners() {
    for (const listener of this.listeners) {
      listener(this.projects.slice()) // slice to get the copy of an array
    }
  }
}
const projectState = ProjectState.getInstance()

//COMPONENT BASE CLASS
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U

  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElementId) as T

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U
    if(newElementId) {
      this.element.id = newElementId
    }

    this.attach(insertAtStart)
  }
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
  }
  abstract configure(): void
  abstract renderContent(): void
}

// PROJECT ITEM CLASS
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
  private project: Project

  get persons() {
    if(this.project.numOfPeople === 1) {
      return '1 person'
    }
    else {
      return `${this.project.numOfPeople} persons`
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id)
    this.project = project

    this.configure()
    this.renderContent()
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title
    this.element.querySelector("h3")!.textContent = this.persons + ' assigned'
    this.element.querySelector("p")!.textContent = this.project.description
  }
  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
    this.element.style.opacity = '0.4';
  }
  @Autobind
  dragEndHandler(event: DragEvent): void {
    this.element.style.opacity = '1';
  }
}

// PROJECT LIST CLASS
// interface ListInnerElement {
//   text: string
//   content: string
//   tagName: string
// }
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
  assignedProjects: Project[]

  constructor(private type: ProjectTypes) {
    super('project-list', 'app', false, `${type}-projects`)
    this.assignedProjects = []

    this.configure()
    this.renderContent()
  }
  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
    projectState.addListener((projects) => {
      this.assignedProjects = projects.filter(prj => {
        if (this.type === ProjectTypes.active) {
          return prj.status === ProjectStatus.active
        } else {
          return prj.status === ProjectStatus.finished
        }
      })
      this.renderProjects()
    })
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if(event.dataTransfer?.types[0] === 'text/plain'){
      event.preventDefault() // by default drop is not allowed
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
  }
  @Autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer?.getData('text/plain')
    if(prjId){
       projectState.moveProject(prjId, this.type === ProjectTypes.active ? ProjectStatus.active : ProjectStatus.finished)
    }
  }
  @Autobind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }

  renderContent() {
    this.element.querySelector('ul')!.id = `${this.type}-project-list`
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement
    listEl.innerHTML = ""
    for (const project of this.assignedProjects) {
      new ProjectItem(listEl.id, project)
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

// PROJECT INPUT CLASS
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement
  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement
    this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement

    this.configure()
  }
  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }
  renderContent(): void {
  }
  private gatherUserInput(): [string, string, number] | null {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1
    }

    if (!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)){
      alert('Invalid input, please try again')
      return null
    }
    else{
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }
  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if(userInput){
      const [title, description, people] = userInput
      projectState.addProject({title, description, numOfPeople: people, status: ProjectStatus.active})
      this.clearInput()
    }
  }
  private clearInput() {
    this.titleInputElement.value = ""
    this.descriptionInputElement.value = ""
    this.peopleInputElement.value = ""
  }
}

const prjInput = new ProjectInput()
const activePrjList = new ProjectList(ProjectTypes.active)
const finishedPrjList = new ProjectList(ProjectTypes.finished)
