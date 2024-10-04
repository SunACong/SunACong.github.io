      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,18,2,26,27,10,13,12,11,31,32,14,15,16,17,29,30,33,3,4,9,5,6,7,8,19,20,21,22,23,24,25,28]}},"star":{"/":{"path":"/star/","indexes":[14,0,1,18,29,2,26,27]}},"timeline":{"/":{"path":"/timeline/","indexes":[0,10,1,18,13,12,11,31,32,14,15,16,17,29,30,2]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      