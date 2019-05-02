class Documenter extends Component {
  
  constructor(){
    super();
    this.addRoute('/documentation', 'Dokumentation');
    this.addEvents({
      'click .show-all-array': 'showHideAllArray'
    });
  }

  showHideAllArray(e){
    let arrNum = $(e.target).attr('data-array-no');
    console.log(arrNum)
    let show = $(e.target).text().includes('Show all');
    $('.arr-hidden-' + arrNum)[show ? 'show' : 'hide']();
    $(e.target).find('.show-or-hide').text(show ? 'Hide most' : 'Show all');
  }

  createDocumentation(){
    this.pathMem = [];
    this.mem = [];
    this.docs = [];
    this.documentAnInstance(App.instance);
    return this.renderDocumentation();
  }

  documentAnInstance(instance, subdoc = false, path = 'app'){
    let indexInMem = this.mem.indexOf(instance);
    if(indexInMem >= 0){ 
      if(path.length < this.pathMem[indexInMem]){
        this.pathMem[indexInMem] = path;
      }
      return; 
    }
    this.mem.push(instance);
    this.pathMem.push(path);
    let d = {path: path, className: instance.constructor.name, props: [], getters: [], setters: []};
    let omit = ['_orgRender', 'render', 'toString', 'inCombos'];

    for(let prop in instance){
      if(omit.includes(prop)){ continue; }
      let val = instance[prop];
      let obj = {name: prop, val: val};
      obj.type = obj.val !== undefined && obj.val !== null && obj.val.constructor ? obj.val.constructor.name : typeof obj.val;
      if(obj.type === 'Array'){
        let same = true, prev = '_____da_____';
        for(let i of obj.val){
          let type = i !== undefined && i !== null && i.constructor  ? i.constructor.name : typeof i;
          same = same && (prev === '_____da_____' || prev === type);
          prev = type;
        }
        if(prev === '_____da_____'){
          obj.type = 'empty Array';
        }
        else {
          obj.type += ' of ' + (same ? prev + 's' : 'mixed types');
        }
      }
      if(!(val.constructor + '').includes('[native code]')){
        obj.subdoc = this.documentAnInstance(val, true, path + '.' + prop);  
      }
      if(val instanceof Array){
        let i = 0, padLen = (val.flat().length + '').length;
        for(let item of val.flat()){
          if(!(item.constructor + '').includes('[native code]')){
            obj.subdoc = obj.subdoc || [];
            let index = '[' + (i + '').padStart(padLen, '0') + ']';
            if(val.length !== val.flat().length){
              index = '[' + (Math.floor(i/(val.length + 1)) + '').padStart(padLen, '0') + ']';
              index += '[' + (i%(val.length + 1) + '').padStart(padLen, '0') + ']'
            }
            obj.subdoc.push(this.documentAnInstance(item, true, path + '.' + prop + index));
            i++;
          }
        }
      }
      d.props.push(obj);
    }
    let methods =  this.getMethods(instance);
    if(methods.length){
      d.props = d.props.concat([{name: 'Methods'}], methods);
    }
    this.docs.push(d);
    if(!subdoc){
      this.docs.sort((a, b) => a.path > b.path ? 1 : -1);
    }
    return d;
  }

  getMethods(obj){
    let proto = Object.getPrototypeOf(obj);
    let descriptors = {};
    while(proto !== Object.prototype && proto !== Component.prototype){
      descriptors = Object.assign(Object.getOwnPropertyDescriptors(proto), descriptors);
      proto = Object.getPrototypeOf(proto);
    }
    delete descriptors.constructor;
    delete descriptors.render;
    let described = [];
    for(let d in descriptors){
      let val = descriptors[d];
      d = val.value ? (((val.value || val.get || val.set) + '').split(')')[0]) + ')' : d;
      described.push({
        name: (val.get ? 'get ' : '')  + (val.set ? 'set ' : '') + d, 
        val: ' ',
        type: ' ',
        method: true
      });
    }
    described.sort((a, b) => {
      a = a.name;
      b = b.name;
      a = (a.indexOf('get ') === 0 ? '__' : '') + a;
      a = (a.indexOf('set ') === 0 ? '_' : '') + a;
      b = (b.indexOf('get ') === 0 ? '__' : '') + b;
      b = (b.indexOf('set ') === 0 ? '_' : '') + b;
      return a > b ? 1 : -1;
    })
    return described;
  }

  renderDocumentation(){
    let html = '';
    for(let i of this.docs){
      i.path = i.path.replace(/\[0(\d{1,})/g,'[$1');
      let level = Math.min(5, i.path.split(/[\.\[]/g).length)
      html+= `
        <div class="instance">
          <h${level} class="mt-5 headline">
            ${i.path}
            <div class="float-right"><small>${i.className}</small></div>
          </h${level}>
          <table class="table table-striped">
            <thead>
              <tr>
                <th width="25%" scope="col">Property</th>
                <th width="25%" scope="col">Type</th>
                <th width="50%" scope="col">Value (instance specific)</th>
              </tr>
            </thead>
            <tbody>
              ${i.props.map(prop => prop.name === 'Methods' ? '</tbody></table><table class="table table-striped methods"><thead><tr><th><div>Methods</div></th></tr></thead>' : `
                <tr>
                  <th scope="row">${prop.name}</th>
                  ${prop.method ? '' : `
                    <td>${prop.type}</td>                                                                                                                                                                                                                                 
                    <td>${['String', 'Number', 'Boolean', 'undefined', 'null', ' '].includes(prop.type + '') ? (prop.type === 'String' ? '"' : '') + prop.val + (prop.type === 'String' ? '"' : ''): '(abstract)'}</td>
                  `}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
    html = $('<div>' + html + '</div>');
    let last, co = 0;
    let arrayCo = 0;
    html.find('.instance').each(function(){
      let h = $(this).find('.headline');
      let text = h.text().trim().split('[')[0];
      if(last === text){
        co++;
      }
      else {
        co = 0;
      }
      if(co > 3){
        if(co === 4){
          arrayCo++;
          $(this).before('<button class="btn btn-primary show-all-array" data-array-no="' + arrayCo + '"><span class="show-or-hide">Show all</span> elements of the array ' + text + '</button>');
        }
        $(this).addClass('arr-hidden-' + arrayCo).hide();
      }
      last = text;
    });
    return html.html();
  }

}