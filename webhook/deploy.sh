BLOG_PATH='/home/tzc123/workspace/reactblog'

echo 'receive post'
echo 'building'
cd $BLOG_PATH
git pull
npm i
npm run build
echo 'finish'
