      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,2,3,4,20,5,15,14,13,25,26,16,17,18,19,27,28,29,6,7,12,8,9,10,11,21,22,23,24]}},"star":{"/":{"path":"/star/","indexes":[16,0,1,2,3,4,20,27,5]}},"timeline":{"/":{"path":"/timeline/","indexes":[0,1,2,3,4,20,15,14,13,25,26,16,17,18,19,27,28,5]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      