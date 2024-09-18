      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,2,3,4,20,5,21,6,7,22,15,14,13,25,26,16,17,18,19,23,24,27,8,9,12,10,11]}},"star":{"/":{"path":"/star/","indexes":[16,0,1,2,3,4,20,23,5]}},"timeline":{"/":{"path":"/timeline/","indexes":[21,6,0,7,1,2,3,22,4,20,15,14,13,25,26,16,17,18,19,23,24,5]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      