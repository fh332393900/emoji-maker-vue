<template>
  <AppHeader></AppHeader>
  <main>
    <div class="emoji-canvas flex justify-center items-center">
      <canvas ref="canvas" :width="canvasSize" :height="canvasSize"></canvas>
    </div>
    <div class="controls flex justify-center items-center">
      <div class="refrsh flex justify-center items-center" @click="getRandom();draw()">
        <img
          :class="{'white-filter': store.getTheme === 'dark'}"
          src="./assets/svg/refrsh.svg"
          width="28"
          alt="refrsh"
        />
      </div>
      <div class="btn" @click="canvas?.toBlob(exportImage)">
        <img
          :class="{'white-filter': store.getTheme === 'dark'}"
          src="./assets/svg/download.svg"
          width="28"
          alt="download"
        />
        <span>{{ $t('action.exportPNG') }}</span>
      </div>
      <div class="btn" @click="toSVGBlob().then(exportImage)">
        <img
          :class="{'white-filter': store.getTheme === 'dark'}"
          src="./assets/svg/download.svg"
          width="28"
          alt="download"
        />
        <span>{{ $t('action.exportSVG') }}</span>
    </div>
    </div>
    <div class="tabs flex justify-center items-center">
      <SelectButton 
        class="tabs-item flex justify-center items-center"
        v-for="(item, index) in tabs"
        :key="index"
        :active="tab === item"
        @click="selectTab(item)"
      >
        <img v-if="selectedImage()[item]" :src="selectedImage()[item]" width="40" height="40" alt="">
      </SelectButton>
    </div>
    <div class="option flex justify-center">
      <SelectButton 
        class="tabs-item flex justify-center items-center"
        v-for="(item, index) in images[tab]"
        :key="index"
        :active="selectedIndex[tab] === index"
        @click="selectOption(index)"
      >
        <img v-show="item" :src="item" width="40" height="40" alt="">
      </SelectButton>
    </div>
  </main>
  <AppFooter></AppFooter>
  <AppUpdateNotice></AppUpdateNotice>
</template>

<script setup lang="ts" name="App">
import { ref, reactive } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import SelectButton from './components/SelectButton.vue';
import AppUpdateNotice from './components/AppUpdateNotice.vue';
import { useThemeStore } from '@/stores/theme';

type SvgImageModule = typeof import('*.svg');
type ImportModuleFunction = () => Promise<SvgImageModule>;
type EmojiSlice = 'head' | 'eyes' | 'eyebrows' | 'mouth' | 'detail';

const tabs: EmojiSlice[] = ['head', 'eyes', 'eyebrows', 'mouth', 'detail'];
const canvasSize = 640;

const store = useThemeStore();
const tab = ref<EmojiSlice>('head');
const canvas = ref<HTMLCanvasElement | null>(null);
const images = reactive<Record<EmojiSlice, string[]>>({
  head: [],
  eyes: [],
  eyebrows: [],
  mouth: [],
  detail: [],
});
const selectedIndex = reactive<Record<EmojiSlice, number>>({
  head: 0,
  eyes: 0,
  eyebrows: 0,
  mouth: 0,
  detail: 0,
});

const selectedImage = () => {
  return {
    head: images.head[selectedIndex.head],
    eyes: images.eyes[selectedIndex.eyes],
    eyebrows: images.eyebrows[selectedIndex.eyebrows],
    mouth: images.mouth[selectedIndex.mouth],
    detail: images.detail[selectedIndex.detail],
  };
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandom = () => {
  selectedIndex.head = randomInt(0, images.head.length - 1);
  selectedIndex.eyes = randomInt(0, images.eyes.length - 1);
  selectedIndex.eyebrows = randomInt(0, images.eyebrows.length - 1);
  selectedIndex.mouth = randomInt(0, images.mouth.length - 1);
  selectedIndex.detail = randomInt(0, images.detail.length - 1);
};

const loadImg = async () => {
  // head
  const headModules = import.meta.glob<SvgImageModule>('./assets/head/*.svg');
  const fullHeadImages = await resolveImportGlobModule(headModules);
  // eyes
  const eyesModules = import.meta.glob<SvgImageModule>('./assets/eyes/*.svg');
  const fullEyesImages = await resolveImportGlobModule(eyesModules);
  // eyebrows
  const eyebrowsModules = import.meta.glob<SvgImageModule>('./assets/eyebrows/*.svg');
  const fullEyebrowsImages = await resolveImportGlobModule(eyebrowsModules);
  // mouth
  const mouthModules = import.meta.glob<SvgImageModule>('./assets/mouth/*.svg');
  const fullMouthImages = await resolveImportGlobModule(mouthModules);
  // detail
  const detailModules = import.meta.glob<SvgImageModule>('./assets/details/*.svg');
  const fullDetailImages = await resolveImportGlobModule(detailModules);
  
  images.head = fullHeadImages;
  images.eyes = ['', ...fullEyesImages];
  images.eyebrows = ['', ...fullEyebrowsImages];
  images.mouth = ['', ...fullMouthImages];
  images.detail = ['', ...fullDetailImages];

  getRandom();
  draw();
};
const pathToImage = async (path: string) => {
  return new Promise<HTMLImageElement | null>((resolve) => {
    if (path === '') {
      resolve(null);
    }
    const img = new Image(10, 10);
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${path}`);
      resolve(null);
    };
  });
};
const resolveImportGlobModule = async (modules: Record<string, ImportModuleFunction>) => {
  const imports = Object.values(modules).map((importFn: () => any) => importFn());
  const loadedModules = await Promise.all(imports);

  return loadedModules.map((module: { default: any; }) => module.default);
};

const exportImage = async (blob: Blob | null) => {
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `emoji_${Date.now()}`;
  document.body.appendChild(a); // 需要先添加到文档中才能触发点击
  a.click();
  document.body.removeChild(a); // 使用完毕后移除
};

const toSVGBlob = async () => {
  const parser = new DOMParser();
  const documents = await Promise.all(Object.values(selectedImage()).map((image: string) => fetch(image).then(response => response.text())));
  const svg = document.createElement('svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 32 32');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  documents.flatMap((doc: string) => {
    const childNode = parser.parseFromString(doc, 'image/svg+xml').documentElement;
    console.log(childNode);
    svg.appendChild(childNode);
  });
  return new Blob([svg.outerHTML], {type: 'image/svg+xml'});
};

const draw = () => {
  const headPath = selectedImage().head;
  const eyesPath = selectedImage().eyes;
  const eyebrowsPath = selectedImage().eyebrows;
  const mouthPath = selectedImage().mouth;
  const detailPath = selectedImage().detail;
  console.log(headPath);
  Promise.all([
    pathToImage(headPath),
    pathToImage(eyesPath),
    pathToImage(eyebrowsPath),
    pathToImage(mouthPath),
    pathToImage(detailPath),
  ]).then(images => {
    console.log(images, 'images');
    const ctx = (canvas.value as HTMLCanvasElement).getContext('2d');
    ctx?.clearRect(0, 0, (canvas.value as HTMLCanvasElement).width, (canvas.value as HTMLCanvasElement).height);
    
    images.forEach(img => {
      img && ctx?.drawImage(img, 0, 0, canvasSize, canvasSize);
    });

    (canvas.value as HTMLCanvasElement).classList.add('animation');
    setTimeout(() => {
      (canvas.value as HTMLCanvasElement).classList.remove('animation');
    }, 500);
  });
};

const selectTab = (activeTab: EmojiSlice) => {
  tab.value = activeTab;
};
const selectOption = (index: number) => {
  selectedIndex[tab.value] = index;
  draw();
};

loadImg();
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 16px;
  background-color: var(--color-box);
  padding: 40px 6rem;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px var(--un-shadow-color, rgba(0,0,0,0.25));
}
.emoji-canvas {
  width: 200px;
  height: 200px;
  border: 2px solid rgba(163, 163, 163, 0.2);
  border-radius: 1rem;
}
canvas {
  width: 160px;
  height: 160px;
}
.tabs {
  width: 100%;
  padding: 20px 4rem;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(163, 163, 163, 0.2);
}
@media (max-width: 1260px) {
  .tabs {
    padding: 20px 2rem;
  }
  main {
    padding: 40px 3rem;
  }
}
@media (max-width: 800px) {
  .tabs {
    padding: 20px;
  }
  main {
    padding: 40px 20px;
  }
}
.tabs-item {
  margin-right: 15px;
  margin-bottom: 12px;
}
.option {
  min-height: 300px;
  margin-top: 20px;
  width: 100%;
  flex-wrap: wrap;
}
.controls {
  padding: 12px 0;
  flex-wrap: wrap;
}
.refrsh {
  cursor: pointer;
  width: 48px;
  min-width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-box-small);
  transition: background-color 0.2s;
}
.refrsh:hover {
  background-color: rgba(221,214,254);
}
.btn {
  display: flex;
  align-items: center;
  margin-left: 14px;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 20px;
  background-color: var(--color-box-small);
  border-radius: 20px;
  transition: background-color 0.2s;
}
.btn span {
  font-weight: 600;
}
.btn:hover {
  background-color: rgba(221,214,254);
}
.white-filter {
  filter: invert(1);
}
</style>
