      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,17,2,19,20,18,12,11,10,26,27,13,14,15,16,24,25,35,3,4,9,5,6,7,8,21,22,28,29,30,31,32,34,33,23]}},"star":{"/":{"path":"/star/","indexes":[13,0,1,17,24,2,19,20]}},"timeline":{"/":{"path":"/timeline/","indexes":[0,18,1,17,12,11,10,26,27,13,14,15,16,24,25,2]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      