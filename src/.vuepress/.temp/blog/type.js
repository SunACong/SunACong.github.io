      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,17,2,3,4,18,12,11,10,19,20,13,14,15,16,21,22,23,5,6,9,7,8]}},"star":{"/":{"path":"/star/","indexes":[13,0,1,17,21,2]}},"timeline":{"/":{"path":"/timeline/","indexes":[3,0,4,1,18,17,12,11,10,19,20,13,14,15,16,21,22,2]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      