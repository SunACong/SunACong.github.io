      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,18,2,10,13,12,11,26,27,14,15,16,17,28,29,30,3,4,9,5,6,7,8,19,20,21,22,23,24,25]}},"star":{"/":{"path":"/star/","indexes":[14,0,1,18,28,2]}},"timeline":{"/":{"path":"/timeline/","indexes":[0,10,1,18,13,12,11,26,27,14,15,16,17,28,29,2]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      