(function(){
    var w = 16, h = 16;
    var img = document.getElementsByClassName('largeavatar')[0];
    img.style.visibility = 'hidden';
    var loaded = false;
    img.onload = function(){
        if(loaded) return;
        loaded = true;
        var original = document.createElement('canvas');
        original.width = w;
        original.height = h;
        var octx = original.getContext('2d');
        octx.drawImage(img,0,0);
        var oImageData = octx.getImageData(0,0,w,h);
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height); 
        var r = w/canvas.width;
        for(var x=0;x<canvas.width;x++){
            for(var y=0;y<canvas.height;y++){
                imageData.data[(y*canvas.width + x) * 4 + 0] = oImageData.data[((y*r|0)*w + x*r|0) * 4 + 0];
                imageData.data[(y*canvas.width + x) * 4 + 1] = oImageData.data[((y*r|0)*w + x*r|0) * 4 + 1];
                imageData.data[(y*canvas.width + x) * 4 + 2] = oImageData.data[((y*r|0)*w + x*r|0) * 4 + 2];
                imageData.data[(y*canvas.width + x) * 4 + 3] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        img.src = canvas.toDataURL();
        img.style.visibility = 'visible';
    };
})();
