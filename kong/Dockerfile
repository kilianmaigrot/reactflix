FROM kong:latest
COPY kong.yml /
RUN cp /etc/kong/kong.conf.default /etc/kong/kong.conf

EXPOSE 8000
EXPOSE 8001
EXPOSE 8443
EXPOSE 8444