FROM docker.io/library/python:3.11 as builder

WORKDIR /app

RUN pip install poetry

COPY pyproject.toml .

RUN poetry install

COPY . .

RUN ls
RUN poetry run make publish


FROM docker.io/library/nginx:latest as release
LABEL authors="lucasoskorep"

COPY --from=builder /app/output/ /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]