# rolluptsbuild
rollup + typescript
# install
yarn install
# build
yarn build
# script test
yarn dev

# 问题1描述
build出的dist/index.d.ts依然是第三方依赖，期望将第三方依赖一并注入index.d.ts
> 已解决：rullop-plugin-dts + node-resolve合并解决
# 问题2描述
问题1解决中，部分包(单文件输出，单声明文件输出)合成有问题，出现将代码也出现在声明文件中了
> 最小包测试用例待实现