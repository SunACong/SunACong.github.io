      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,18,2,10,13,12,11,28,29,14,15,16,17,26,27,30,3,4,9,5,6,7,8,19,20,21,22,23,24,25]}},"star":{"/":{"path":"/star/","indexes":[14,0,1,18,26,2]}},"timeline":{"/":{"path":"/timeline/","indexes":[10,0,1,18,13,12,11,28,29,14,15,16,17,26,27,2]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      