let myLeads= []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLoacalStorage= JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLoacalStorage)

if(leadsFromLoacalStorage){
    myLeads = leadsFromLoacalStorage
    render(myLeads)
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
  
})

function render(leads){
let listItems = ""
    for(let i =0; i< leads.length; i++){
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li> "
    listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `;
    }  
 ulEl.innerHTML = listItems
}   

deleteBtn.addEventListener("dblclick" , function(){
    console.log("double clicked!")
    localStorage.clear()
    myLeads= []
    render(myLeads) //empty leads
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)

})
