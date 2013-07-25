(function(){
    var w = 16, h = 16;
    var img = document.getElementsByClassName('largeavatar')[0];
    var original_img = document.createElement('img');
    var loaded = false;
    function load(_, _loaded){
        if(loaded) return;
        loaded = !_loaded;
        var original = document.createElement('canvas');
        var octx = original.getContext('2d');
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = img.height;
        original.height = h;
        img.parentNode.appendChild(canvas);
        img.parentNode.removeChild(img);
        canvas.width = img.width;
        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height); 
        (function(){
            original.width = w;
            octx.drawImage(original_img,0,0);
            var oImageData = octx.getImageData(0,0,w,h);
            canvas.width = img.width;
            var r = w/canvas.width;
            var iData = imageData.data;
            var cw = canvas.width;
            var ch = canvas.height;
            var oData = oImageData.data;
            for(var x=0;x<cw;x++){
                for(var y=0;y<ch;y++){
                    var ii = (y*cw+x)*4;
                    var oi = ((y*r|0)*w + x*r|0) * 4;
                    iData[ii    ] = oData[oi    ];
                    iData[ii + 1] = oData[oi + 1];
                    iData[ii + 2] = oData[oi + 2];
                    iData[ii + 3] = oData[oi + 3];
                }
            }
            ctx.putImageData(imageData, 0, 0);
            setTimeout(arguments.callee, 30);
        })();
    };
    original_img.onload = load;
    original_img.src = img.src;
})();
