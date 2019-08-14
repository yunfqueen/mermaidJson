var json = {
  direction:'LR',
  data:[
    {id:'A',name:'材料标号',type:'input',text:'20版',icon:'fa:fa-car',nextId:['B'],subgraph:'one'},
    {id:'B',name:'原材料库',type:'library',text:[20,30,null,40],nextId:['C','D','E','F'],subgraph:'one'},
    {id:'C',name:'单价',type:'output',text:'4.5',nextId:['M']},
    {id:'D',name:'规格长',type:'output',text:'6000',nextId:['I','K']},
    {id:'E',name:'规格宽',type:'output',text:'2000',nextId:['I','K']},
    {id:'F',name:'规格厚',type:'output',text:'550',nextId:['K','R']},
    {id:'G',name:'零件长',type:'input',text:'550',nextId:['R']},
    {id:'H',name:'零件宽',type:'input',text:'42',nextId:['R']},
    {id:'I',name:'冲压件加工个数模型',type:'model',nextId:['J']},
    {id:'J',name:'加工个数',type:'output',text:'570',nextId:['K']},
    {id:'K',name:'冲压件工艺定额模型',type:'model',nextId:['L']},
    {id:'L',name:'工艺定额',type:'output',text:'0.6013',nextId:['M']},
    {id:'M',name:'冲压件材料定额模型',type:'model',nextId:['Q']},
    {id:'N',name:'净重',type:'output',text:'0.59',nextId:['M']},
    {id:'P',name:'废料单价',type:'input',text:'0.09',nextId:['M']},
    {id:'R',name:'冲压件净重模型',type:'model',nextId:['N']},
    {id:'Q',name:'材料费',type:'result'}
  ]
}

var json2 = {
  direction:'TB',
  data:[
    {id:'A',name:'1材料标号',type:'input',text:'20版',icon:'fa:fa-car',nextId:['B']},
    {id:'B',name:'1原材料库',type:'library',nextId:['C','D','E','F']},
    {id:'C',name:'单价',type:'output',text:'4.5'},
    {id:'D',name:'规格长',type:'output',text:'6000',},
    {id:'E',name:'规格宽',type:'output',text:'2000',},
    {id:'F',name:'规格厚',type:'output',text:'550',},
  ]
}