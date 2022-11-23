
## Orion API
  
  
## Choices Fields (important)

```python
ClassroomType = (
    ("TP", "TP"),
    ("TD", "TD"),
    ("Amphi", "Amphi"),
    ("Other", "Other")
)

RequestStatus = (
    ("Approved", "Approved"),
    ("On Waiting", "On Waiting"),
    ("Desapproved", "Desapproved")
)
Frequency = (
    ("Week", "Week"),
    ("Month", "Month")
)
# diffrent syntax will be rejected
```
## Running The API

Clone the Repo then :

```python
python3 -m venv env
source env/bin/activate  
# On Windows use `env\Scripts\activate`

# Install Django and Django REST framework into the virtual environment
pip install Django==3.2.12
pip install djangorestframework

#Run the server 

python manage.py runserver
```
    
## API Reference

#### Get all Staff

```http
  GET|POST /staff
```

#### Get item

```http
  GET|PUT|DELETE|POST /staff/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |


#### Get all classroom

```http
  GET|POST /classroom
```

#### Get item

```http
  GET|PUT|DELETE|POST /classroom/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |



#### Get all sessions

```http
  GET| POST /sessions
```

#### Get item

```http
  GET|PUT|DELETE|POST /sessions/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |


#### Get all request

```http
  GET| POST /request
```

#### Get item

```http
  GET|PUT|DELETE|POST /request/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |


#### Admin Pannel

```http
  /admin
```

## Appendix
Admin Username and Password :

OrionUP

505sollution
