FROM node:16-alpine
# set the working directory 
# of the container 
# path from the root dir 
WORKDIR /backend 

ENV PATH=/backend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install --force
# copy the files 
COPY . .
# 
EXPOSE 5000
CMD npm start