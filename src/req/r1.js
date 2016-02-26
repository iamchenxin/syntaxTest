/**
 * Created by iamchenxin on 1/27/16.
 */
function log_m(){
  console.log('module.id: ', module.id);
  console.log('module.exports: ', module.exports);
  console.log('module.parent: ', module.parent);
  console.log('module.filename: ', module.filename);
  console.log('module.loaded: ', module.loaded);
  console.log('module.children: ', module.children);
  console.log('module.paths: ', module.paths);

}

log_m();

module.exports=log_m;

