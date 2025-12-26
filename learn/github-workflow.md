# Github 工作流

工作流配置文件位置：.github/workflow


# 参考资料：

- https://juejin.cn/post/7457070778098892840#heading-4
- https://docs.github.com/en/actions/get-started/quickstart


# 踩坑

- 找不到package.json文件

配置actions/checkout@v4


- npm install 失败

配置 actions/setup-node@v3


- npm publish 或者 npm run publish 报错

实际上是同一个包被发布了两次，版本号相同导致的报错

npm publish 和 package.json中设置的publish脚本都会执行
所以要么给publish脚本改个名，然后执行这个脚本命令
要么把publish脚本删掉，执行原生的npm publish命令

- npm version patch 失败

自动修改版本号失败，
- 更新版本号时会修改package.json文件，并生成一条commit信息
- 这条信息没有push，导致远程的package.json版本号滞后

痛点：commit这个命令怎么都不成功，头痛死了


```yaml
- name: Set up Git user
  run: |
    git config --global user.name "piuyixiu"
    git config --global user.email "1597167270@qq.com"

- name: Bump version (optional)
  run: npm version patch 

- name: Commit changes
  run: |
    git add .
    git commit -m "Bump version" || echo "No changes to commit"
    git push origin master
  env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```