
let tool = "select"
let items = []
let selectedItem = null
let dragging = false
let resizing = false
let resizeDir = ""
let mouseX = 0
let mouseY = 0
let itemX = 0
let itemY = 0
let itemW = 0
let itemH = 0
let zIndex = 1
let isTouch = false

const landingPage = document.getElementById("landingPage")
const toolPage = document.getElementById("toolPage")
const homeBtn = document.getElementById("homeBtn")

const startBtn = document.getElementById("start")
const canvas = document.getElementById("canvas")
const hint = document.getElementById("hint")
const counter = document.getElementById("counter")

const selectBtn = document.getElementById("selectBtn")
const textBtn = document.getElementById("textBtn")
const boxBtn = document.getElementById("boxBtn")
const circleBtn = document.getElementById("circleBtn")

const xInput = document.getElementById("xInput")
const yInput = document.getElementById("yInput")
const wInput = document.getElementById("wInput")
const hInput = document.getElementById("hInput")
const bgInput = document.getElementById("bgInput")
const textInput = document.getElementById("textInput")
const fontInput = document.getElementById("fontInput")
const frontBtn = document.getElementById("frontBtn")
const backBtn = document.getElementById("backBtn")
const deleteBtn = document.getElementById("deleteBtn")
const clearBtn = document.getElementById("clearBtn")

const mobileFrontBtn = document.getElementById("mobileFrontBtn")
const mobileBackBtn = document.getElementById("mobileBackBtn")
const mobileDeleteBtn = document.getElementById("mobileDeleteBtn")
const mobileClearBtn = document.getElementById("mobileClearBtn")

// login



const login = document.getElementById("loginOverlay")
const profileContainer = document.getElementById("pro")
const profileImg = document.querySelector("#profileImg img")
const profileName = document.querySelector("#proflieText h2")
const profileJob = document.querySelector("#proflieText p")

const loginSave = document.getElementById("loginSave")
const loginClose = document.getElementById("loginClose")

profileContainer.style.display = "none"

function loadProfile() {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) {
        profileName.textContent = saved.name;
        profileJob.textContent = saved.job;
        profileImg.src = saved.img;

        profileContainer.style.display = "flex";
    }
}
loadProfile();

homeBtn.addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) {
        document.getElementById("userName").value = saved.name;
        document.getElementById("userJob").value = saved.job;
        document.getElementById("userImg").value = "";
    }
    loginOverlay.classList.add("show");
});

// CLOSE LOGIN
loginClose.addEventListener("click", () => {
    loginOverlay.classList.remove("show")
})

loginSave.addEventListener("click", () => {
    const name = document.getElementById("userName").value.trim()
    const job = document.getElementById("userJob").value.trim()
    const file = document.getElementById("userImg").files[0]

    if (!name || !job) {
        alert("Please enter name & profession");
        return
    }

    let saved = JSON.parse(localStorage.getItem("profile"));
    let imgURL = saved?.img || profileImg.src;

    if (file) {
        imgURL = URL.createObjectURL(file);
    }

    profileName.textContent = name;
    profileJob.textContent = job;
    profileImg.src = imgURL;


    profileContainer.style.display = "flex";
    loginOverlay.classList.remove("show");

    localStorage.setItem("profile", JSON.stringify({
        name, job, img: imgURL
    }));

})
profileContainer.addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) {
        document.getElementById("userName").value = saved.name;
        document.getElementById("userJob").value = saved.job;
        document.getElementById("userImg").value = "";
    }
    loginOverlay.classList.add("show");
});





function themes() {
    const theme = document.querySelector("#icon i:first-child")
    const rootElement = document.documentElement

    let flag = 0

    theme.addEventListener('click', function () {
        if (flag === 0) {
            rootElement.style.setProperty('--white', 'rgb(230, 230, 230)')
            rootElement.style.setProperty('--lgray', 'rgb(151, 151, 151)')
            rootElement.style.setProperty('--dgray', 'rgb(31, 31, 31)')
            rootElement.style.setProperty('--black', 'rgb(8, 8, 8)')

            theme.classList = 'ri-sun-line'
            flag = 1

        } else {
            rootElement.style.setProperty('--white', 'rgb(8, 8, 8)')
            rootElement.style.setProperty('--lgray', 'rgb(31, 31, 31)')
            rootElement.style.setProperty('--dgray', 'rgb(151, 151, 151)')
            rootElement.style.setProperty('--black', 'rgb(230, 230, 230)')

            theme.classList = 'ri-moon-fill'
            flag = 0
        }
    })
}
window.addEventListener('DOMContentLoaded', themes)




window.onload = () => {
    setTimeout(() => {
        landingPage.classList.add('hide');

        setTimeout(() => {
            landingPage.style.display = 'none';
            toolPage.classList.add("show");
        }, 600);
    }, 6000);
}



homeBtn.onclick = function () {
    toolPage.classList.remove("show");
    toolPage.style.display = 'none';

    landingPage.style.display = 'flex';
    landingPage.classList.remove("hide");
}
// login
homeBtn.onclick = () => loginOverlay.classList.add("show");
login.onclick = () => loginOverlay.classList.remove("show");

function setTool(t) {
    tool = t
    selectBtn.classList.remove("active")
    textBtn.classList.remove("active")
    boxBtn.classList.remove("active")
    circleBtn.classList.remove("active")

    if (t === "select") selectBtn.classList.add("active")
    if (t === "text") textBtn.classList.add("active")
    if (t === "box") boxBtn.classList.add("active")
    if (t === "circle") circleBtn.classList.add("active")
}

selectBtn.onclick = function () { setTool("select") }
textBtn.onclick = function () { setTool("text") }
boxBtn.onclick = function () { setTool("box") }
circleBtn.onclick = function () { setTool("circle") }

function getCanvasPosition(e) {
    const rect = canvas.getBoundingClientRect()
    let x, y

    if (e.type.includes("touch")) {
        x = e.touches[0].clientX - rect.left
        y = e.touches[0].clientY - rect.top
        isTouch = true
    } else {
        x = e.clientX - rect.left
        y = e.clientY - rect.top
        isTouch = false
    }

    return { x, y }
}

canvas.addEventListener("click", function (e) {
    if (e.target !== canvas) return
    const pos = getCanvasPosition(e)

    if (tool === "text") makeTextElement(pos.x, pos.y)
    if (tool === "box") makeBoxElement(pos.x, pos.y)
    if (tool === "circle") makeCircleElement(pos.x, pos.y)
})

canvas.addEventListener("touchstart", function (e) {
    if (e.target !== canvas) return
    e.preventDefault()
    const pos = getCanvasPosition(e)

    if (tool === "text") makeTextElement(pos.x, pos.y)
    if (tool === "box") makeBoxElement(pos.x, pos.y)
    if (tool === "circle") makeCircleElement(pos.x, pos.y)
}, { passive: false })

function adjustTextHeight(element) {
    if (!element.classList.contains("text-element")) return

    element.style.height = "auto"

    let newHeight = element.scrollHeight
    if (newHeight < 40) newHeight = 40

    element.style.height = newHeight + "px"

    if (selectedItem === element) {
        updatePanel()
    }
}

function makeTextElement(x, y) {
    const el = document.createElement("div")
    el.className = "element text-element"
    el.style.left = x + "px"
    el.style.top = y + "px"
    el.style.width = "150px"
    el.style.height = "40px"
    el.style.color = textInput.value
    el.style.fontSize = fontInput.value + "px"
    el.style.zIndex = zIndex++
    el.contentEditable = true
    el.textContent = "Click to edit text"

    addResizeHandles(el)
    setupElementEvents(el)
    canvas.appendChild(el)
    items.push(el)

    if (items.length === 1) hint.style.display = "none"

    selectElement(el)
    updateCounter()

    setTimeout(function () {
        el.focus()
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
    }, 100)
}

function makeBoxElement(x, y) {
    const el = document.createElement("div")
    el.className = "element box-element"
    el.style.width = "130px"
    el.style.height = "90px"
    el.style.left = x + "px"
    el.style.top = y + "px"
    el.style.backgroundColor = bgInput.value
    el.style.zIndex = zIndex++

    addResizeHandles(el)
    setupElementEvents(el)
    canvas.appendChild(el)
    items.push(el)

    if (items.length === 1) hint.style.display = "none"

    selectElement(el)
    updateCounter()
}

function makeCircleElement(x, y) {
    const el = document.createElement("div")
    el.className = "element circle-element"
    el.style.width = "110px"
    el.style.height = "110px"
    el.style.left = x + "px"
    el.style.top = y + "px"
    el.style.backgroundColor = bgInput.value
    el.style.zIndex = zIndex++

    addResizeHandles(el)
    setupElementEvents(el)
    canvas.appendChild(el)
    items.push(el)

    if (items.length === 1) hint.style.display = "none"

    selectElement(el)
    updateCounter()
}

function addResizeHandles(element) {
    const handles = ["nw", "ne", "sw", "se"]
    handles.forEach(function (pos) {
        const handle = document.createElement("div")
        handle.className = "resize-handle resize-" + pos
        handle.dataset.dir = pos
        element.appendChild(handle)
    })
}

function setupElementEvents(element) {
    element.addEventListener("mousedown", function (e) {
        if (e.target.classList.contains("resize-handle")) {
            startResizing(element, e.target.dataset.dir, e)
        } else {
            selectElement(element)
            startDragging(element, e)
        }
        e.stopPropagation()
    })

    element.addEventListener("touchstart", function (e) {
        if (e.target.classList.contains("resize-handle")) {
            startResizing(element, e.target.dataset.dir, e.touches[0])
        } else {
            selectElement(element)
            startDragging(element, e.touches[0])
        }
        e.stopPropagation()
    }, { passive: false })

    element.addEventListener("dblclick", function () {
        if (element.classList.contains("text-element")) {
            element.contentEditable = true
            element.focus()
        }
    })

    element.addEventListener("blur", function () {
        if (element.classList.contains("text-element")) {
            element.contentEditable = false
            if (!element.textContent.trim()) {
                element.textContent = "Click to edit text"
            }
        }
    })

    element.addEventListener("input", function () {
        if (element.classList.contains("text-element")) {
            adjustTextHeight(element)
        }
    })

    element.addEventListener("keydown", function (e) {
        if (element.classList.contains("text-element")) {
            if (e.key === "Enter") {
                e.preventDefault()
                document.execCommand("insertHTML", false, "<br>")
                adjustTextHeight(element)
            }
        }
    })

    element.addEventListener("paste", function (e) {
        e.preventDefault()
        const text = (e.originalEvent || e).clipboardData.getData("text/plain")
        document.execCommand("insertText", false, text)
        adjustTextHeight(element)
    })
}

function startDragging(element, e) {
    dragging = true

    mouseX = e.clientX
    mouseY = e.clientY
    itemX = parseInt(element.style.left)|| 0;
    itemY = parseInt(element.style.top) || 0;
}

function startResizing(element, dir, e) {
    resizing = true
    resizeDir = dir
    const rect = element.getBoundingClientRect()
    mouseX = e.clientX
    mouseY = e.clientY
    itemX = parseInt(element.style.left)
    itemY = parseInt(element.style.top)
    itemW = rect.width
    itemH = rect.height
}

document.addEventListener("mousemove", handleMove)
document.addEventListener("touchmove", handleMove, { passive: false })

function handleMove(e) {
    if (!selectedItem) return

    let clientX, clientY
    if (e.type.includes("touch")) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
    } else {
        clientX = e.clientX
        clientY = e.clientY
    }

    const canvasRect = canvas.getBoundingClientRect()
    const canvasWidth = canvasRect.width
    const canvasHeight = canvasRect.height

    if (dragging && selectedItem) {
        const deltaX = clientX - mouseX
        const deltaY = clientY - mouseY

        let newLeft = itemX + deltaX
        let newTop = itemY + deltaY

        const itemWidth = selectedItem.offsetWidth
        const itemHeight = selectedItem.offsetHeight

        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight

        if (newLeft < 0) newLeft = 0
        if (newTop < 0) newTop = 0
        if (newLeft + itemWidth > cw) newLeft = cw - itemWidth
        if (newTop + itemHeight > ch) newTop = ch - itemHeight

        selectedItem.style.left = `${newLeft}px`;
        selectedItem.style.top = `${newTop}px`;

        updatePanel()
    }

    if (resizing && selectedItem) {
        const deltaX = clientX - mouseX
        const deltaY = clientY - mouseY

        let newWidth = itemW
        let newHeight = itemH
        let newLeft = itemX
        let newTop = itemY

        if (resizeDir.includes("e")) {
            newWidth = Math.max(30, itemW + deltaX)
        }
        if (resizeDir.includes("w")) {
            newWidth = Math.max(30, itemW - deltaX)
            newLeft = itemX + deltaX
        }
        if (resizeDir.includes("s")) {
            newHeight = Math.max(30, itemH + deltaY)
        }
        if (resizeDir.includes("n")) {
            newHeight = Math.max(30, itemH - deltaY)
            newTop = itemY + deltaY
        }

        if (newLeft < 0) {
            newWidth += newLeft
            newLeft = 0
            newWidth = Math.max(30, newWidth)
        }
        if (newTop < 0) {
            newHeight += newTop
            newTop = 0
            newHeight = Math.max(30, newHeight)
        }

        if (newLeft + newWidth > canvasWidth) {
            newWidth = canvasWidth - newLeft
        }
        if (newTop + newHeight > canvasHeight) {
            newHeight = canvasHeight - newTop
        }

        if (selectedItem.classList.contains("circle-element")) {
            const size = Math.min(newWidth, newHeight)
            newWidth = size
            newHeight = size
        }

        if (selectedItem.classList.contains("text-element")) {
            selectedItem.style.width = newWidth + "px"
            selectedItem.style.height = newHeight + "px"

            adjustTextHeight(selectedItem)
        } else {
            selectedItem.style.width = newWidth + "px"
            selectedItem.style.height = newHeight + "px"
        }

        selectedItem.style.left = newLeft + "px"
        selectedItem.style.top = newTop + "px"

        updatePanel()
    }
}

document.addEventListener("mouseup", function () {
    dragging = false
    resizing = false
})

document.addEventListener("touchend", function () {
    dragging = false
    resizing = false
})

function selectElement(element) {
    if (selectedItem) selectedItem.classList.remove("selected")
    selectedItem = element
    element.classList.add("selected")
    setTool("select")
    updatePanel()
    enablePanel()

    if (window.innerWidth <= 480) {
        document.querySelector(".panel").scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
}

function enablePanel() {
    xInput.disabled = false
    yInput.disabled = false
    wInput.disabled = false
    hInput.disabled = false
    frontBtn.disabled = false
    backBtn.disabled = false
    deleteBtn.disabled = false
    mobileFrontBtn.disabled = false
    mobileBackBtn.disabled = false
    mobileDeleteBtn.disabled = false

    if (selectedItem.classList.contains("text-element")) {
        textInput.disabled = false
        fontInput.disabled = false
        bgInput.disabled = true
    } else {
        textInput.disabled = true
        fontInput.disabled = true
        bgInput.disabled = false
    }
}

function updatePanel() {
    if (!selectedItem) {
        xInput.value = ""
        yInput.value = ""
        wInput.value = ""
        hInput.value = ""
        xInput.disabled = true
        yInput.disabled = true
        wInput.disabled = true
        hInput.disabled = true
        bgInput.disabled = true
        textInput.disabled = true
        fontInput.disabled = true
        frontBtn.disabled = true
        backBtn.disabled = true
        deleteBtn.disabled = true
        mobileFrontBtn.disabled = true
        mobileBackBtn.disabled = true
        mobileDeleteBtn.disabled = true
        return
    }

    xInput.value = parseInt(selectedItem.style.left) || 0
    yInput.value = parseInt(selectedItem.style.top) || 0
    wInput.value = parseInt(selectedItem.offsetWidth) || 0
    hInput.value = parseInt(selectedItem.offsetHeight) || 0

    if (selectedItem.classList.contains("text-element")) {
        const color = selectedItem.style.color || "#000000"
        textInput.value = rgbToHex(color)
        const fontSize = parseInt(selectedItem.style.fontSize) || 16
        fontInput.value = fontSize
    }
}

function rgbToHex(rgb) {
    if (rgb.startsWith("#")) return rgb

    const rgbValues = rgb.match(/\d+/g)
    if (!rgbValues || rgbValues.length < 3) return "#000000"

    const r = parseInt(rgbValues[0]).toString(16).padStart(2, "0")
    const g = parseInt(rgbValues[1]).toString(16).padStart(2, "0")
    const b = parseInt(rgbValues[2]).toString(16).padStart(2, "0")

    return "#" + r + g + b
}

xInput.onchange = function () {
    if (!selectedItem) return
    let val = parseInt(xInput.value) || 0
    const max = canvas.offsetWidth - selectedItem.offsetWidth
    if (val < 0) val = 0
    if (val > max) val = max
    selectedItem.style.left = val + "px"
    updatePanel()
}

yInput.onchange = function () {
    if (!selectedItem) return
    let val = parseInt(yInput.value) || 0
    const max = canvas.offsetHeight - selectedItem.offsetHeight
    if (val < 0) val = 0
    if (val > max) val = max
    selectedItem.style.top = val + "px"
    updatePanel()
}

wInput.onchange = function () {
    if (!selectedItem) return
    let val = parseInt(wInput.value) || 30
    const max = canvas.offsetWidth - parseInt(selectedItem.style.left)
    if (val < 30) val = 30
    if (val > max) val = max

    if (selectedItem.classList.contains("circle-element")) {
        selectedItem.style.width = val + "px"
        selectedItem.style.height = val + "px"
        hInput.value = val
    } else if (selectedItem.classList.contains("text-element")) {
        selectedItem.style.width = val + "px"
        adjustTextHeight(selectedItem)
    } else {
        selectedItem.style.width = val + "px"
    }
    updatePanel()
}

hInput.onchange = function () {
    if (!selectedItem) return
    let val = parseInt(hInput.value) || 30
    const max = canvas.offsetHeight - parseInt(selectedItem.style.top)
    if (val < 30) val = 30
    if (val > max) val = max

    if (selectedItem.classList.contains("circle-element")) {
        selectedItem.style.height = val + "px"
        selectedItem.style.width = val + "px"
        wInput.value = val
    } else if (selectedItem.classList.contains("text-element")) {
        selectedItem.style.height = val + "px"
    } else {
        selectedItem.style.height = val + "px"
    }
    updatePanel()
}

bgInput.oninput = function () {
    if (!selectedItem || selectedItem.classList.contains("text-element")) return
    selectedItem.style.backgroundColor = bgInput.value
}

textInput.oninput = function () {
    if (!selectedItem || !selectedItem.classList.contains("text-element")) return
    selectedItem.style.color = textInput.value
}

fontInput.onchange = function () {
    if (!selectedItem || !selectedItem.classList.contains("text-element")) return
    selectedItem.style.fontSize = fontInput.value + "px"
    adjustTextHeight(selectedItem)
}

frontBtn.onclick = function () {
    if (!selectedItem) return
    selectedItem.style.zIndex = zIndex++
}

backBtn.onclick = function () {
    if (!selectedItem) return
    selectedItem.style.zIndex = 1
}

deleteBtn.onclick = function () {
    if (!selectedItem) return
    selectedItem.remove()
    items = items.filter(function (item) { return item !== selectedItem })
    selectedItem = null
    updateCounter()
    updatePanel()
    if (items.length === 0) hint.style.display = "block"
}

clearBtn.onclick = function () {
    if (items.length === 0) return
    if (!confirm("Are you sure you want to clear the canvas?")) return
    items.forEach(function (item) { item.remove() })
    items = []
    selectedItem = null
    hint.style.display = "block"
    updateCounter()
    updatePanel()
}

mobileFrontBtn.onclick = function () {
    frontBtn.onclick()
}

mobileBackBtn.onclick = function () {
    backBtn.onclick()
}

mobileDeleteBtn.onclick = function () {
    deleteBtn.onclick()
}

mobileClearBtn.onclick = function () {
    clearBtn.onclick()
}

function updateCounter() {
    counter.textContent = items.length + " item" + (items.length !== 1 ? "s" : "")
}

canvas.addEventListener("mousedown", function (e) {
    if (e.target === canvas && selectedItem) {
        selectedItem.classList.remove("selected")
        selectedItem = null
        updatePanel()
    }
})

canvas.addEventListener("touchstart", function (e) {
    if (e.target === canvas && selectedItem) {
        selectedItem.classList.remove("selected")
        selectedItem = null
        updatePanel()
    }
}, { passive: false })

window.addEventListener("resize", function () {
    if (selectedItem) {
        const maxX = canvas.offsetWidth - selectedItem.offsetWidth
        const maxY = canvas.offsetHeight - selectedItem.offsetHeight

        let left = parseInt(selectedItem.style.left) || 0
        let top = parseInt(selectedItem.style.top) || 0

        if (left > maxX) selectedItem.style.left = maxX + "px"
        if (top > maxY) selectedItem.style.top = maxY + "px"

        updatePanel()
    }
})