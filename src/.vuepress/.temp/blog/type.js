      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,2,3,4,22,5,13,6,7,14,17,16,15,23,24,18,19,20,21,25,26,27,8,9,12,10,11]}},"star":{"/":{"path":"/star/","indexes":[18,0,1,2,3,4,22,25,5]}},"timeline":{"/":{"path":"/timeline/","indexes":[13,0,6,1,7,2,14,3,4,22,17,16,15,23,24,18,19,20,21,25,26,5]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      