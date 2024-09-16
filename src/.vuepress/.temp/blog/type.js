      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[0,1,16,2,3,17,11,10,9,20,21,12,13,14,15,18,19,22,4,5,8,6,7]}},"star":{"/":{"path":"/star/","indexes":[12,0,1,16,18,2]}},"timeline":{"/":{"path":"/timeline/","indexes":[0,3,1,17,16,11,10,9,20,21,12,13,14,15,18,19,2]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      