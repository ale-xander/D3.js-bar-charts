console.log('lol')
//define margins
const margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 100
}

// append svg to the canvas class
const svg = d3.select('.canvas')
                .append('svg')
                .attr('width', 600)
                .attr('height', 600);

// create margins
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;
const graph = svg.append('g')
                .attr('width', graphWidth)
                .attr('height', graphHeight)
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

// create groups for the axes
const xAxisGroup = graph.append('g')
                        .attr('transform', `translate(0, ${graphHeight})`)// make x go to the bottom

const yAxisGroup = graph.append('g')




db.collection('menu-items').get().then(res =>{
    // console.log(res)
    let data = [];
    res.docs.forEach(doc => {
        // console.log(doc.data())
        data.push(doc.data())
    });
    // console.log(data)
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.orders)])
        .range([graphHeight, 0]);
    
    const x = d3.scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);
    const rects = graph.selectAll('rect') 
            .data(data);
    rects.attr('width', x.bandwidth)
        .attr("height", d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders))
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        // .attr("height", d => y(d.orders))
        .attr("height", d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders))
    const xAxis = d3.axisBottom(x)
                    
    const yAxis = d3.axisLeft(y)
                    .ticks(3)
                    .tickFormat(d => d + ' orders')
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
    xAxisGroup.selectAll('text')
            .attr('transform', 'rotate(-40)')
            .attr('text-anchor', 'end')
            .attr('fill', 'orange')
})


/*
d3.json('menu.json').then(data => {

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.orders)])
    //   
    .range([graphHeight, 0]);
  
    // const min = d3.min(data, d=> d.orders)
    // console.log('min '+ min)
    // const max = d3.max(data, d => d.orders)
    // console.log('max '+ max)
    // const extent = d3.extent(data, d => d.orders)
    // console.log('extent ' + extent)


    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0, 500])
        .paddingInner(0.2)
        .paddingOuter(0.2);
    
        console.log(x.bandwidth())
  
    // join the data to circs
    const rects = graph.selectAll('rect') // switch svg.selectAll to graph.selectAll
      .data(data);
  
    // add attrs to circs already in the DOM
    rects.attr('width', x.bandwidth)
    //   .attr("height", d => y(d.orders))
      .attr("height", d => graphHeight - y(d.orders))
      .attr('fill', 'orange')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.orders))
  
    // append the enter selection to the DOM
    rects.enter()
      .append('rect')
        .attr('width', x.bandwidth)
        // .attr("height", d => y(d.orders))
        .attr("height", d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders))

    // create and call the axes
    const xAxis = d3.axisBottom(x) //needs to know where to position stuff on the X axis
                    
    const yAxis = d3.axisLeft(y)
                    .ticks(3)
                    .tickFormat(d => d + ' orders')
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
    xAxisGroup.selectAll('text')
            .attr('transform', 'rotate(-40)')
            .attr('text-anchor', 'end')
            .attr('fill', 'orange')
  
  });
  */