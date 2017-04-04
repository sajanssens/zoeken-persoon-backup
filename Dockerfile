FROM nginx:1.11

COPY dist /usr/share/nginx/html/app/zoeken-persoon
COPY default.conf /etc/nginx/conf.d/