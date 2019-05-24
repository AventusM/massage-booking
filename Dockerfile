FROM node:10
EXPOSE 3001

WORKDIR /usr/src/app
RUN mkdir massage-booking-system-frontend
COPY massage-booking-system-frontend/package*.json ./massage-booking-system-frontend
RUN cd massage-booking-system-frontend && npm install

COPY . .

RUN cd /usr/src/app/massage-booking-system-frontend && npm run-script build

WORKDIR /usr/src/app
RUN mv ./massage-booking-system-frontend/build ./massage-booking-system-backend

WORKDIR /usr/src/app/massage-booking-system-backend
RUN npm install

CMD [ "npm", "start" ]
