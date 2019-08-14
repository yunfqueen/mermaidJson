var edgeIdArr = [];
//下一个节点
function getNextVal(data,val,prevVal,prevId){
  let portfolioVal;
  let nextVal;
  let str='';
  let edgeIds = [];
  let edgeId = '';
  if(val.nextId){
    for(let j=0;j<val.nextId.length;j++){
      const id = val.nextId[j];
      const nextArr = data.filter(t=>t.id===id)
      nextArr.forEach((item)=>{ //nextId
        edgeId = `${prevId}_${item.id}`
        if(item.type==='input'||item.type==='output'||item.type==='result'){
          nextVal = `${item.id}((${item.name}))`
        }else if(item.type==='library'||item.type==='model'){
          nextVal = `${item.id}(${item.name})`
        }
        const isArr = val.text?Array.isArray(val.text):'';
        const currentText = val.text?(isArr?val.text[j]:val.text):''
        if(currentText){
            portfolioVal = `${prevVal}--"${currentText}"-->${nextVal}` 
        }else{
          portfolioVal = `${prevVal}-->${nextVal}` 
        }
        str += portfolioVal+ "\n";
        edgeIds.push(edgeId)
      })
    }
  }
  return {str,edgeIds};
}

//css
function getCss(inputCssStr,outputCssStr,modelCssStr,libraryCssStr,resultCssStr){
  const inCssIds = inputCssStr?`class ${inputCssStr} inCss\n`:'';
  const outCssIds = outputCssStr?`class ${outputCssStr} outCss\n`:'';
  const modelCssIds = modelCssStr?`class ${modelCssStr} modelCss\n`:'';
  const libraryCssIds = libraryCssStr?`class ${libraryCssStr} libraryCss\n`:'';
  const resultCssIds = resultCssStr?`class ${resultCssStr} resultCss\n`:'';
  const strCss =  `${inCssIds}${outCssIds}${modelCssIds}${libraryCssIds}${resultCssIds}`
  return strCss
}

//获得最终数据
function getMermaid(){
  let str=`graph ${mermaidData.direction}\n`;
  let portfolioVal;
  let prevVal; //连接线头部节点
  let inputCssStr = ''; //输入
  let outputCssStr = ''; //输出
  let libraryCssStr = ''; //库
  let modelCssStr = ''; //模型
  let resultCssStr = ''; //结果
  let currentEdgeIds = ''; //当前edge id
  let prevContent = '' //头部节点内容
  edgeIdArr = [];
  for (let i=0;i<mermaidData.data.length;i++){
    let item = mermaidData.data[i];
    prevContent = item.icon?(item.icon+' ' + item.name):item.name
    if(item.type==='input'){ //圆
      prevVal = `${item.id}((${prevContent}))`
      inputCssStr += item.id+','
    }else if(item.type==='output'){
      prevVal = `${item.id}((${prevContent}))`
      outputCssStr += item.id+','
    }else if(item.type==='model'){
      prevVal = `${item.id}(${prevContent})`
      modelCssStr += item.id+','
    }else if(item.type==='library'){ //方块
      prevVal = `${item.id}(${prevContent})`
      libraryCssStr += item.id+','
    }
    if(item.nextId){
      portfolioVal = getNextVal(mermaidData.data,item,prevVal,item.id).str;
      currentEdgeIds = getNextVal(mermaidData.data,item,prevVal,item.id).edgeIds;
      edgeIdArr = edgeIdArr.concat(currentEdgeIds);
      str += portfolioVal+ "\n";
    }else{
      resultCssStr += item.id+','
    }
  }
  const strCss = getCss(inputCssStr,outputCssStr,modelCssStr,libraryCssStr,resultCssStr)
  str += strCss;
  return str;
}

//给每个node，edge点击事件
function cycleDom(){
  //点击node
  for(let i=0;i<mermaidData.data.length;i++){
    let item = mermaidData.data[i].id;
    
    document.getElementById(item).addEventListener('click', function () {
      let nodeData = (mermaidData.data.filter(t=>t.id===this.id))[0]
        nodeClick(this.id,nodeData)
    }, true);
  }
  //点击edge

  for(let i=0;i<edgeIdArr.length;i++){
    const item = edgeIdArr[i];
    document.getElementById(item).addEventListener('click', function () {
      const arrId=this.id.split('_');
      const prevNodeId = arrId[0];
      const nextNodeId = arrId[1];
      edgeClick(this.id,prevNodeId,nextNodeId)
    }, true);
  }
  
}

//数据改变后重新初始化
function renderInit(){
  document.getElementById('graphDiv').innerHTML=getMermaid();
  mermaid.initialize({
    flowchart: {curve: 'basis'} //圆滑连接线
  })
  $('#graphDiv').removeAttr('data-processed');
  mermaid.init(undefined, $("#graphDiv")); 
  cycleDom();
}

