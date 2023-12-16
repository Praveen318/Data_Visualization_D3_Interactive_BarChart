// // Used https://d3-graph-gallery.com/graph/barplot_basic.html
// // Used https://stackoverflow.com/
// // Used Chatgpt to write some snippet of code and then after completing gave full code to chatgpt to structure and comment it...

// // Declare variables that will be used throughout the script
// var chart;
// var height = 200;
// var width = 300;
// var vis;

// // This function is called when the webpage is loaded. It's like the starting point for our script.
// function init(){
//   // We're creating a drawing area (SVG) inside the HTML element with id 'vis'. This is where our chart will live.
//   chart = d3.select('#vis').append('svg')
//     .attr('width', 400)
//     .attr('height', 300);
  
//   // We're adding a group (g) to our SVG. This group will contain all the visual elements of our chart.
//   // We're also moving this group a little to the right by transforming it.
//   vis = chart.append('g').attr('transform', 'translate(50,0)');
// }

// // This function is called when the update button on the webpage is clicked.
// function updateClicked(){
//   // We're loading data from a CSV file. Once the data is loaded, the 'update' function is called.
//   d3.csv('data/CoffeeData.csv',update);
// }

// // This function is called when the data from the CSV file is ready. It's responsible for creating and updating the chart.
// function update(rawdata){
//   // First, we remove any existing elements in our chart. This is useful when we're updating the chart with new data.
//   vis.selectAll("*").remove();
  
//   // We're creating scales for our chart. Scales are functions that map from an input domain to an output range.
//   var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1); // For the X-axis
//   var yScale = d3.scaleLinear().rangeRound([height, 0]); // For the Y-axis
//   var colorScale = d3.scaleOrdinal(d3.schemeCategory10); // For colors

//   // We're getting the selected options from the dropdown menus on the webpage.
//   var xOption = getXSelectedOption(); // For the X-axis
//   var yOption = getYSelectedOption(); // For the Y-axis

//   // We're aggregating the data based on the selected options. This means we're grouping the data by certain variables and calculating sums.
//   var data = d3.nest()
//     .key(function(d) { return d[xOption]; })
//     .rollup(function(v) { return d3.sum(v, function(d) { return d[yOption]; }); })
//     .entries(rawdata);

//   // We're setting the domains of our scales. The domain is the range of input values that the scale will accept.
//   xScale.domain(data.map(function(d) { return d.key; }));
//   yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

//   // We're drawing the bars of our bar chart.
//   vis.selectAll(".bar")
//     .data(data)
//     .enter().append("rect") // For each piece of data, we append a rectangle (bar).
//     .attr("class", "bar") // We give it a class for styling purposes.
//     .attr("x", function(d) { return xScale(d.key); }) // The x position of the bar is determined by the x scale.
//     .attr("y", function(d) { return yScale(d.value); }) // The y position of the bar is determined by the y scale.
//     .attr("width", xScale.bandwidth()) // The width of the bar is determined by the bandwidth of the x scale.
//     .attr("height", function(d) { return height - yScale(d.value); }) // The height of the bar is determined by the height of the chart and the y scale.
//     .attr("fill", function(d) { return colorScale(d.key); }); // The color of the bar is determined by the color scale.

//   // We're adding the X-axis to our chart.
//   vis.append("g")
//     .attr("transform", "translate(0," + height + ")") // We position it at the bottom of the chart.
//     .call(d3.axisBottom(xScale)); // We create the axis with the x scale.

//   // We're adding the Y-axis to our chart.
//   vis.append("g")
//     .attr("transform", "translate(" + width + ",0)") // We position it at the right of the chart.
//     .call(d3.axisRight(yScale).ticks(getYTicks())); // We create the axis with the y scale and a dynamic number of ticks.
// }

// // This function returns the selected option in the X-axis dropdown menu on the webpage.
// function getXSelectedOption(){
//   var node = d3.select('#xdropdown').node(); // We select the dropdown menu.
//   var i = node.selectedIndex; // We get the index of the selected option.
//   return node[i].value; // We return the value of the selected option.
// }

// // This function returns the selected option in the Y-axis dropdown menu on the webpage.
// function getYSelectedOption(){
//   var node = d3.select('#ydropdown').node(); // We select the dropdown menu.
//   var i = node.selectedIndex; // We get the index of the selected option.
//   return node[i].value; // We return the value of the selected option.
// }

// // This function returns the number of ticks for the Y-axis based on the X-axis selection.
// // Ticks are the small lines or marks along an axis.
// function getYTicks(){
//   var xOption = getXSelectedOption(); // We get the selected option in the X-axis dropdown menu.
//   if(xOption === 'region') {
//     return 6; // If the selected option is 'region', we return 6.
//   } else if(xOption === 'category') {
//     return 5; // If the selected option is 'category', we return 5.
//   }
// }


// Used https://d3-graph-gallery.com/graph/barplot_basic.html
// Used https://stackoverflow.com/
// Used Chatgpt to write some snippet of code and then after completing gave full code to chatgpt to structure and comment it...

var chart;
var height = 200;
var width = 300;
var vis;

function init(){
  chart = d3.select('#vis').append('svg')
    .attr('width', 400)
    .attr('height', 300);
  
  // Adding group(g) to SVG and moving group to right by transforming it.
  vis = chart.append('g').attr('transform', 'translate(50,0)');
}

function updateClicked(){
  d3.csv('data/CoffeeData.csv',update);
}

function update(rawdata){
  // Removing any existing elements in chart
  vis.selectAll("*").remove();
  
  // Creating scales for chart
  var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1); // X-axis
  var yScale = d3.scaleLinear().rangeRound([height, 0]); // Y-axis
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Colours

  // Getting selected options from dropdown menus
  var xOption = getXSelectedOption(); 
  var yOption = getYSelectedOption(); 

  // Aggregating data based on selected option.  Grouping data by certain variables and calculating sum.
  var data = d3.nest()
    .key(function(d) { return d[xOption]; })
    .rollup(function(v) { return d3.sum(v, function(d) { return d[yOption]; }); })
    .entries(rawdata);

  // Setting domains of scales
  xScale.domain(data.map(function(d) { return d.key; }));
  yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

  // Drawing bars in bar chart.
  vis.selectAll(".bar")
    .data(data)
    .enter().append("rect") 
    .attr("class", "bar") 
    .attr("x", function(d) { return xScale(d.key); }) 
    .attr("y", function(d) { return yScale(d.value); }) 
    .attr("width", xScale.bandwidth()) 
    .attr("height", function(d) { return height - yScale(d.value); }) 
    .attr("fill", function(d) { return colorScale(d.key); }); 

  // Adding the X-axis to chart.
  vis.append("g")
    .attr("transform", "translate(0," + height + ")") 
    .call(d3.axisBottom(xScale)); 

  // Adding Y-axis to chart
  vis.append("g")
    .attr("transform", "translate(" + width + ",0)") 
    .call(d3.axisRight(yScale).ticks(getYTicks())); 
}

function getXSelectedOption(){
  var node = d3.select('#xdropdown').node(); 
  var i = node.selectedIndex; 
  return node[i].value; 
}

function getYSelectedOption(){
  var node = d3.select('#ydropdown').node(); 
  var i = node.selectedIndex; 
  return node[i].value; 
}

// Function returns number of ticks for the Y-axis based on region or category.
function getYTicks(){
  var xOption = getXSelectedOption(); 
  if(xOption === 'region') {
    return 6; 
  } else if(xOption === 'category') {
    return 5; 
  }
}
