// quad tree has the form
// xi, yi, xf, yf, elements, ul, ur, br, bl
//let maxCapacity = 5;
//let quadTree = createQuad([0, 0, mapPixels, mapPixels]); //declaration on gamestate

// element [x, y], quadTree, created by splitting
function insertQuad(element, quad, deep){
  // check if the element is in this quad
  if(!isInQuad(quad, element)) return false;
  // if quadtree have children
  if(!!quad[5]){
    // for each children check where is the position
    for (var i = 5; i < quad.length; i++) {
      if(insertQuad(element, quad[i])) return true;
    }
    console.log('esto no deberia pasar por aca')
  }
  // insert the element
  quad[4].push(element);
  // if quad exced capacity split
  if(quad[4].length>25&&!deep){
    // x, y, width/2
    let half = [quad[0]/2+quad[2]/2, quad[1]/2+quad[3]/2];
    quad[5] = createQuad([quad[0], quad[1], half[0], half[1]])
    quad[6] = createQuad([quad[0], half[1], half[0], quad[3]])
    quad[7] = createQuad([half[0], quad[1], quad[2], half[1]])
    quad[8] = createQuad([half[0], half[1], quad[2], quad[3]])

    for (var i = 0; i < quad[4].length; i++) {
      insertQuad(quad[4][i], quad[5], true);
      insertQuad(quad[4][i], quad[6], true);
      insertQuad(quad[4][i], quad[7], true);
      insertQuad(quad[4][i], quad[8], true);
    }
    quad[4]=[];
  }
  return true;
}

function createQuad(values){
  return values.concat([[],,,,]);
}

function isInQuad(quad, point){
  return quad[0]<=point[0]&&quad[2]>point[0]&&quad[1]<=point[1]&&quad[3]>point[1];
}
// check if element A collides with element B
function intersectRect(elementA, elementB) {
  return (elementA[0]-elementA[2] <= elementA[0]+elementA[2] &&
          elementB[0]-elementB[2] <= elementA[0]+elementA[2] &&
          elementA[1]-elementA[3] <= elementB[1]+elementB[3] &&
          elementB[1]-elementB[3] <= elementA[1]+elementA[3])
}

function collides(element, quad){
  if(!isInQuad(quad, element)) return;
  if(!!quad[5]){
    for (var i = 5; i < quad.length; i++) {
      let collideElement = collides(element, quad[i]);
      if(collideElement) return collideElement;
    }
  }
  for (var i = 0; i < quad[4].length; i++) {
    if(intersectRect(quad[4][i], element)) return quad[4][i];
  }
  return;
}

function getTotal(quad){
  let total = quad[4].length;
  if(!!quad[5]){
    for (var i = 5; i < quad.length; i++) {
      total+=getTotal(quad[i]);
    }
  }
  return total;
}

function removeQuad(element, quad, force){
  if(!force&&!isInQuad(quad, element)) return false;
  if(!!quad[5]){
    // for each children check where is the position
    for (var i = 5; i < quad.length; i++) {
      removeQuad(element, quad[i], force);
    }
    if(getTotal(quad)==0){
      quad[5]=quad[6]=quad[7]=quad[8]=undefined;
    } 

    return true;
  }
  let index = quad[4].indexOf(element);
  if(index==-1) return false;
  //console.log('eliminado', quad);
  quad[4].splice(index, 1);
}

function updateQuad(quad){
  let removed = [];
  if(!!quad[5]){
    for (var i = 5; i < quad.length; i++) {
      removed = removed.concat(updateQuad(quad[i]));
    }
    if(getTotal(quad)==0){
      quad[5]=quad[6]=quad[7]=quad[8]=undefined;
    }
    return removed;
  }
  for (var i = quad[4].length-1; i >=0; i--) {
    // if element move to another quad remove it
    if(!isInQuad(quad, quad[4][i])){
      removed.push(quad[4][i]);
      removeQuad(quad[4][i], quad, true);
    }
  }
  return removed;
}
function checkUpdateQuad(root){
  let removed = updateQuad(root);
  
  for (var i = 0; i < removed.length; i++) {
    insertQuad(removed[i], root);
  }
  
}

if(DEBUG){ 
  function drawQuad(quad, ctx){
    ctx.strokeStyle='green';
    ctx.strokeRect(quad[0]+viewPort[0], quad[1]+viewPort[1], quad[2]-quad[0], quad[3]-quad[1]);
    if(!!quad[5]){
      drawQuad(quad[5], ctx);
      drawQuad(quad[6], ctx);
      drawQuad(quad[7], ctx);
      drawQuad(quad[8], ctx);
    }
    ctx.strokeStyle='red';
    for (var i = 0; i < quad[4].length; i++) {
      let element = quad[4][i];
      ctx.fillRect(element[0]-element[2]+viewPort[0], element[1]-element[3]+viewPort[1], element[2], element[3]);
    }
  }
}
