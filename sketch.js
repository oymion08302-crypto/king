let p5Instance = null;

window.addEventListener('DOMContentLoaded', () => {
  const riabtn = document.querySelector('.riabtn');
  const viewer = document.getElementById('viewer');
  const closeBtn = document.getElementById('close3d');

  // sketch.js の DOMContentLoaded 内
  document.getElementById('close3d').addEventListener('click', () => {
    const viewer = document.getElementById('viewer');
    viewer.classList.add('hidden');
  });
  if (riabtn) {
    riabtn.addEventListener('click', () => {
      console.log("3Dマップを起動します");
      viewer.classList.remove('hidden');
      if (!p5Instance) {
        startP5();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      viewer.classList.add('hidden');
      // 完全に消去したい場合は p5Instance.remove(); p5Instance = null; を追加
    });
  }
});

function startP5() {
  p5Instance = new p5((p) => {
    let modelData, tex;

    p.preload = () => {
      // あなたのフォルダにあるファイル名を指定します
      // index.htmlと同じ階層にある前提です
      modelData = p.loadModel('ria5.obj', true);
      tex = p.loadImage('ria5.jpg');
    };

    p.setup = () => {
      // 画面サイズに合わせたキャンバスを作成
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      canvas.parent('viewer');
    };

    p.draw = () => {
      p.background(0); // 背景は黒
      p.orbitControl(); // マウスでぐりぐり回せるようになります

      p.ambientLight(150); // 全体を明るく
      p.directionalLight(255, 255, 255, 0, 0, -1); // 光を当てる

      p.push();
      // 見やすいようにゆっくり回転
      p.rotateY(p.frameCount * 0.01);
      // OBJモデルは上下逆さまに出ることが多いため反転
      p.scale(1, -1, 1);

      p.noStroke();
      p.texture(tex); // あなたの画像を貼る
      p.model(modelData); // あなたの3Dデータを表示
      p.pop();
    };

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
    };
  });
}