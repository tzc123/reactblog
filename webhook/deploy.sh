BLOG_PATH = '/home/tzc123/workspace/reactblog'

echo 'receive post'
echo 'building'
cd $BLOG_PATH
git pull 
npm run server
echo 'finish'