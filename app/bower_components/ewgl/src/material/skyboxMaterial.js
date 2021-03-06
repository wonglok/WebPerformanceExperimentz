(function(global){
  var undef;
  
  var emptyTexture;
  
  materialList = global.materialList;
  
  var skyboxMaterial = {
    "geometries" : [],
    "zOrdered": false,
    "shaderProgram" : undef,
    "lastUpdate": -1
  };
  Object.defineProperties(skyboxMaterial,{
    "renderer":{
      "get":function(){
        return global.renderer;
      }
    }
  });
  
  
  skyboxMaterial.update = function(){};
  
  skyboxMaterial.render = function(info){
    
    var i,renderer = skyboxMaterial.renderer,
        l = skyboxMaterial.geometries.length,
        gl = skyboxMaterial.renderer.gl,
        shaderProgram,
        geom,mesh;
    
    //setshader
    if (! skyboxMaterial.shaderProgram){
      createShaderProgram();
    }
    shaderProgram =  skyboxMaterial.shaderProgram;
    renderer.useProgram(shaderProgram);
    
    //setcameraMatrix
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, skyboxMaterial.renderer.camera.perspective);
    gl.uniformMatrix4fv(shaderProgram.cMatrixUniform, false, mat4.inverse(quat4.toMat4(skyboxMaterial.renderer.camera.worldRotation)));
    
    //render Geometries
    for(i=0;i<l;i++){
      geom = skyboxMaterial.geometries[i];
      if(geom.lastUpdate === info.counter){
        mesh = geom.mesh;
        //setmatrix
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, geom.matrix);
        
        //draw
        if (mesh.vertexbuffers.position.flags.dataChanged){
          renderer.AdjustGLBuffer(mesh.vertexbuffers.position);
        }
        
        if (mesh.vertexbuffers.color.flags.dataChanged){
          renderer.AdjustGLBuffer(mesh.vertexbuffers.color);
        }
        
        if (mesh.vertexbuffers.texture.flags.dataChanged){
          renderer.AdjustGLBuffer(mesh.vertexbuffers.texture);
        }
        
        if (mesh.vertexbuffers.indices.flags.dataChanged){
          renderer.AdjustGLELMENTBuffer(mesh.vertexbuffers.indices);
        }
        
        if (!geom.materialOptions.texture){
          geom.materialOptions.texture = createEmptyTexture();
        }
        
        if (!geom.materialOptions.texture.texture){
          geom.materialOptions.texture.texture = gl.createTexture();
        }
        
        if (geom.materialOptions.texture.flags.imageLoaded){
          gl.bindTexture(gl.TEXTURE_2D, geom.materialOptions.texture.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, geom.materialOptions.texture.image);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.bindTexture(gl.TEXTURE_2D, null);
          geom.materialOptions.texture.flags.imageLoaded = false;
        }
        
        
        
        gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vertexbuffers.position.glObject);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vertexbuffers.color.glObject);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vertexbuffers.texture.glObject);
        gl.vertexAttribPointer(shaderProgram.TexturePosition, 2, gl.FLOAT, false, 0, 0);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, geom.materialOptions.texture.texture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.vertexbuffers.indices.glObject);
        gl.drawElements(gl.TRIANGLES, mesh.vertexbuffers.indices.size, gl.UNSIGNED_SHORT, 0);
        
      }
    }
  };
  
  var createEmptyTexture = function(){
     if (!emptyTexture){
       emptyTexture = new EWGL.texture({"url":"http://media.tojicode.com/q3bsp/demo_baseq3/webgl/no-shader.png"});
     }
     return emptyTexture;
  };
  
  var vertexshader = 
      "attribute vec3 aVertexPosition;" +
      "attribute vec2 aTexturePosition;" +
      "attribute vec4 aVertexColor;" +
      "uniform mat4 uMVMatrix;" + 
      "uniform mat4 uPMatrix;" +
      "uniform mat4 uCMatrix;" +
      "varying vec4 vColor;" +
      "varying vec2 vTexture;" + 
      "" + 
      "void main(void) {" +
      "  gl_Position = uPMatrix * (uCMatrix * uMVMatrix) * vec4(aVertexPosition, 1.0);" +
      "  vColor = aVertexColor;" +
      "  vTexture = aTexturePosition;" +
      "}";
  var fragmentshader = "#ifdef GL_ES\n" +
      "  precision highp float; \n" +
      "#endif \n" + 
      "varying vec4 vColor;" +
      "varying vec2 vTexture;" +
      "uniform sampler2D uSampler;" + 
      "void main(void) { \n" +
      "gl_FragColor = texture2D(uSampler, vec2(vTexture.s, vTexture.t)); \n" +
      "}\n";
  
  
  var createShaderProgram = function(){
    var start = +(new Date());
    var r = skyboxMaterial.renderer;
    
    var shaderProgram = r.createShaderProgram(vertexshader,fragmentshader);
    //console.log("shaderprogram alone:" + ( +(new Date()) - start));
    shaderProgram.vertexPositionAttribute =r.getAttribute(shaderProgram,"aVertexPosition");
    shaderProgram.vertexColorAttribute =r.getAttribute(shaderProgram,"aVertexColor");
    shaderProgram.TexturePosition =r.getAttribute(shaderProgram,"aTexturePosition");
    
    
    shaderProgram.pMatrixUniform = r.getUniform(shaderProgram, "uPMatrix");
    shaderProgram.cMatrixUniform = r.getUniform(shaderProgram, "uCMatrix");
    shaderProgram.mvMatrixUniform = r.getUniform(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = r.getUniform(shaderProgram, "uSampler");
    
    skyboxMaterial.shaderProgram = shaderProgram;
    //console.log( +(new Date()) - start);
  };
  
  
  
  materialList.registerMaterial(skyboxMaterial);
  
  global.skyboxMaterial = skyboxMaterial;
  
}(EWGL));