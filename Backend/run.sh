## remove the container if it exists
docker rm -f match-maker
## remove the image if it exists
docker rmi -f match-maker
## build the image
docker build -t match-maker .
# run the container
docker run -d -p 8080:8080 --name match-maker match-maker