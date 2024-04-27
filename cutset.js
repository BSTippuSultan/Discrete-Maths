
let vertexInput = document.querySelector('#vertexInput');
let addVertex_btn = document.querySelector("#addVertex");

let edgeInputONE = document.querySelector('#edgeInputONE');
let edgeInputTWO = document.querySelector('#edgeInputTWO');
let addEdge_btn = document.querySelector("#addEdge");

let edgesOutput = document.querySelector(".edgesOutput");

let buttons = document.querySelectorAll('button');
for (button of buttons){
  button.addEventListener('click',(event)=> {
    let color = event.target.style.backgroundColor ;
    event.target.style.backgroundColor = 'white';
    setTimeout(()=> {
      event.target.style.backgroundColor = color;
    },100)
  })
}

let vertexinputBox = document.querySelector(".vertexinputBox");
let edgeinputBox = document.querySelector(".edgeinputBox");

class Graph {
    constructor() {
        this.vertices = {};
        this.edges = [];
      }
    
      addVertex(vertex) {
        console.log('vertex aded',vertexInput.value);
        if (!this.vertices[vertex]) {
          this.vertices[vertex] = [];
        }
      }
    
      addEdge(vertex1, vertex2) {
        console.log('edge added',edgeInputONE.value, edgeInputTWO.value);
        if (!this.vertices[vertex1] || !this.vertices[vertex2]) {
          /*    print box */
          edgeinputBox.innerHTML = `<div style="color:red;">&nbsp;VERTICES NOT FOUND &nbsp;</div>`;
          throw new Error("Vertices not found");
         
        }
        this.vertices[vertex1].push(vertex2);
        this.vertices[vertex2].push(vertex1);
        this.edges.push([vertex1, vertex2]);
      }
    
      findAllEdgeCombinations() {
        const edgesCount = this.edges.length;
        const edgeCombinations = [];
    
        // Generate all possible combinations of edges
        for (let i = 0; i < edgesCount; i++) {
          for (let j = i + 1; j < edgesCount; j++) {
            for (let k = j + 1; k < edgesCount; k++) {
              edgeCombinations.push([this.edges[i], this.edges[j], this.edges[k]]);
            }
          }
        }
    
        return edgeCombinations;
      }
    
      isDisconnected(edgeCombination) {
        // Temporarily remove the edges in the combination
        for (let edge of edgeCombination) {
          const vertex1 = edge[0];
          const vertex2 = edge[1];
          this.removeEdge(vertex1, vertex2);
        }
    
        // Check if the graph is disconnected
        const disconnected = !this.isConnected();
    
        // Restore the edges
        for (let edge of edgeCombination) {
          const vertex1 = edge[0];
          const vertex2 = edge[1];
          this.addEdge(vertex1, vertex2);
        }
    
        return disconnected;
      }
    
      findAllMinEdgeCuts() {
        const edgeCombinations = this.findAllEdgeCombinations();
        const minCuts = [];
    
        // Check each combination if it disconnects the graph
        for (let combination of edgeCombinations) {
          if (this.isDisconnected(combination)) {
            minCuts.push(combination);
          }
        }
    
        // Find minimal cuts
        const minimalCuts = [];
        for (let cut of minCuts) {
          let isMinimal = true;
          for (let otherCut of minCuts) {
            if (cut !== otherCut && this.isSubset(cut, otherCut)) {
              isMinimal = false;
              break;
            }
          }
          if (isMinimal) {
            minimalCuts.push(cut);
          }
        }
    
        return minimalCuts;
      }
    
      isSubset(arr1, arr2) {
        return arr1.every(edge => arr2.some(otherEdge => edge[0] === otherEdge[0] && edge[1] === otherEdge[1]));
      }
    
      isConnected() {
        const visited = {};
        const queue = [];
        const startVertex = Object.keys(this.vertices)[0];
    
        queue.push(startVertex);
        visited[startVertex] = true;
    
        while (queue.length > 0) {
          const currentVertex = queue.shift();
    
          for (let neighbor of this.vertices[currentVertex]) {
            if (!visited[neighbor]) {
              visited[neighbor] = true;
              queue.push(neighbor);
            }
          }
        }
    
        return Object.keys(visited).length === Object.keys(this.vertices).length;
      }
    
      removeEdge(vertex1, vertex2) {
        this.vertices[vertex1] = this.vertices[vertex1].filter(v => v !== vertex2);
        this.vertices[vertex2] = this.vertices[vertex2].filter(v => v !== vertex1);
        this.edges = this.edges.filter(edge => !(edge[0] === vertex1 && edge[1] === vertex2) && !(edge[0] === vertex2 && edge[1] === vertex1));
      }
    }       
    // usage 

// Example usage:
const graph = new Graph();

    
let inputLength = 1 ;


addVertex_btn.addEventListener('click', () => {
  vertexinputBox.innerText = ''
  graph.addVertex(vertexInput.value);
  if(vertexInput.value == ''){
    vertexinputBox.innerHTML = `<div style="color:red;">&nbsp;NO VERTEX ENTERED&nbsp;</div>`;
  }
  else{
  vertexinputBox.innerHTML = `<div style="color:blue;">${vertexInput.value}&nbsp;:&nbsp;</div><div>vertex added</div>`;
  }
vertexInput.value = '';
});

addEdge_btn.addEventListener('click', () => {
  let t = true;
  for(e of graph.edges){
    if((e[0] == edgeInputONE.value && e[1] == edgeInputTWO.value) || (e[1] == edgeInputONE.value && e[0] == edgeInputTWO.value) ){
    console.log('ented twice');
    t = false;
    }
  }   if(t){ 
    graph.addEdge(edgeInputONE.value, edgeInputTWO.value);
    }
  if(edgeInputONE.value == '' || edgeInputTWO.value == ''){
    edgeinputBox.innerHTML = `<div style="color:red;">&nbsp;NO EDGE ENTERED&nbsp;</div>`;
  }
  else{
    edgeinputBox.innerHTML = `<div style="color:blue;">${edgeInputONE.value}</div>
                              <div>&nbsp;and&nbsp</div>
                              <div style="color:blue;">${edgeInputTWO.value}&nbsp;:&nbsp</div>
                              <div>edge added</div>`;
  }  
});


/*
graph.addVertex("v1");
graph.addVertex("v2");
graph.addVertex("v3");
graph.addVertex("v4");
graph.addVertex("v5");
graph.addVertex("v6");

graph.addEdge("v1", "v2");
graph.addEdge("v1", "v4");
graph.addEdge("v1", "v6");

graph.addEdge("v2","v6");
graph.addEdge("v2","v5");

graph.addEdge("v3","v4");

graph.addEdge("v4","v5");
graph.addEdge("v4","v6");

graph.addEdge("v5", "v6");

*/

function sirdard(){
    function findAllSubsets(arr) {
      const subsets = [[]];
    
      for (let i = 0; i < arr.length; i++) {
        const currentSubsetLength = subsets.length;
        for (let j = 0; j < currentSubsetLength; j++) {
          const currentSubset = subsets[j];
          subsets.push([...currentSubset, arr[i]]);
        }
      }
    
      return subsets;
    }
    
    function combinations(arr, k) {
      const subsets = findAllSubsets(arr);
      const result = subsets.filter(subset => subset.length === k);
      return result;
    }
    
    const allEdges = graph.edges;
    const minCuts = [];




    for (let i = 1; i <= allEdges.length; i++) {
        const combinationsOfSizeK = combinations(allEdges, i);
        for (let combination of combinationsOfSizeK) {
          for (let edge of combination) {
            graph.removeEdge(edge[0], edge[1]); // Corrected typo here
          }
          if (!graph.isConnected()) {
            minCuts.push(combination);
          }
          for (let edge of combination) {
            graph.addEdge(edge[0], edge[1]); // Corrected typo here
          }
        }
      }
      console.log("All Minimum Edge Cuts:");
      console.dir(minCuts);
      
      edgesOutput.innerHTML = '';
let lengthArray = [];

if (minCuts.length === 0) {
  console.log('no weak connection');
} else {
  console.log('entered');
lengthArray = [minCuts[0].length];
  for (let i = 0; i < minCuts.length; i++) {
    if (!(lengthArray.includes(minCuts[i].length))) {
      lengthArray.push(minCuts[i].length);
    }
    // console.dir(minCuts[i].length);
  }
}

console.log(lengthArray);




    try{

      for (let i = 0 ; i < inputLength ; i++){

        let arrayHeading = document.createElement("div") ;
            arrayHeading.setAttribute('class','arrayHeading')
            arrayHeading.innerText = `Least Connected by order ${ i + 1} ` ;
            arrayHeading.style.backgroundColor = 'rgb(111, 251, 204)';
            edgesOutput.appendChild(arrayHeading);

let count = 1 ;

        for (array of minCuts){
          
          if( lengthArray[i] == array.length ){ 

        let outputformat = document.createElement("div");
        outputformat.setAttribute('class','outputformat');
        edgesOutput.appendChild(outputformat);


            let arrayHeadingCount = document.createElement("div") ;
            arrayHeadingCount.setAttribute('class','arrayHeading') ;
            arrayHeadingCount.innerText = `count :${count++} ` ;
            arrayHeadingCount.style.color = 'blue';
            outputformat.appendChild(arrayHeadingCount);

            for (innerArray of array){

              let outArray = document.createElement('div');
              outArray.setAttribute('class','outArray') ;
              outputformat.appendChild(outArray);
              let outOne = document.createElement('div');
              outOne.setAttribute('class','outOne');
              outOne.innerText = innerArray[0];

              let outTwo = document.createElement('div');
              outTwo.setAttribute('class','outTwo') ;
              outTwo.innerText = innerArray[1];

              outArray.appendChild(outOne);
              outArray.appendChild(outTwo);

              console.log(innerArray[0],", " , innerArray[1]);
          }
          console.log("above");
         }
         
        }
        count = 0;
      }

    } catch(error){
      console.log(error);
    }
}





/* output by submit button */

let calculate = document.querySelector("#calculate");
let Reset = document.querySelector("#Reset");

calculate.addEventListener(('click'),() => {
  vertexinputBox.innerHTML = `<div style="color:blue;">&nbsp; CUTSETS in Output &nbsp;</div>`;
  edgeinputBox.innerHTML = `<div style="color:blue;">&nbsp; CUTSETS in Output &nbsp;</div>`;
  setTimeout(()=> {
    vertexinputBox.innerHTML = `<div style="color:black;">&nbsp; Add vertices &nbsp;</div>`;
    edgeinputBox.innerHTML = `<div style="color:black;">&nbsp; Add edges after vertices &nbsp;</div>`;
  },500)
  sirdard();   
  // calculateAns();
})

Reset.addEventListener(('click'),() => {
  graph.edges = [];
  graph.vertices = {};
  edgesOutput.innerHTML = '';
  vertexinputBox.innerHTML = `<div style="color:blue;">&nbsp; ALL VERTICES REMOVED &nbsp;</div>`;
  edgeinputBox.innerHTML = `<div style="color:blue;">&nbsp; ALL EDGES REMOVED &nbsp;</div>`;
  setTimeout(()=> {
    vertexinputBox.innerHTML = `<div style="color:black;">&nbsp; Add vertices &nbsp;</div>`;
    edgeinputBox.innerHTML = `<div style="color:black;">&nbsp; Add edges after vertices &nbsp;</div>`;
  },1000)
})

/* important declaration by order */ 
/* output by radio */

let orderInput = document.querySelectorAll(".orderInput");
for (orderInputRadio of orderInput){
orderInputRadio.addEventListener('click',(event)=>{
inputLength = event.target.value * 1 ;
console.log('order') ;
});
}

