BLOG_PATH='/home/tzc123/workspace/reactblog'

echo 'receive post'
echo 'building'
cd $BLOG_PATH
git reset --hard origin/master
git pull
npm run build
echo 'finish'
