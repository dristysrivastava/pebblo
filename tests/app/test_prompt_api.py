from unittest.mock import patch

import pytest
from fastapi import FastAPI
from starlette.testclient import TestClient

from pebblo.app.routers.routers import router_instance

app = FastAPI()
app.include_router(router_instance.router)

client = TestClient(app)


@pytest.fixture
def mock_write_json_to_file():
    with patch(
        "pebblo.app.service.prompt_service.Prompt._write_file_content_to_path"
    ) as mock_write_json_to_file:
        yield mock_write_json_to_file


def test_app_prompt_success(mock_write_json_to_file):
    """
    Test the app prompt endpoint.
    """
    mock_write_json_to_file.return_value = None
    test_payload = {
        "name": "Test App",
        "context": [
            {
                "retrieved_from": "test_data.pdf",
                "doc": "This is test doc.",
                "vector_db": "ChromaDB",
            },
            {
                "retrieved_from": "test_data1.pdf",
                "doc": "This is test1 doc.",
                "vector_db": "ChromaDB",
            },
        ],
        "prompt": {"data": "What is Sachin's Passport ID?"},
        "response": {"data": "His passport ID is 5484880UA."},
        "prompt_time": "2024-04-17T15:03:18.177368",
        "user": "Test Owner",
        "user_identities": ["test_group@test.com"],
    }

    response = client.post("/v1/prompt", json=test_payload)

    assert response.status_code == 200
    assert response.json()["message"] == "AiApp Prompt Processed Successfully"


def test_app_prompt_validation_errors(mock_write_json_to_file):
    """
    Test the app prompt endpoint with validation errors.
    """
    mock_write_json_to_file.return_value = None
    test_payload = {
        "name": "Test App",
        "context": [
            {
                "retrieved_from": "test_data.pdf",
                "doc": "This is test doc.",
            },
            {
                "retrieved_from": "test_data1.pdf",
                "vector_db": "ChromaDB",
            },
        ],
        "prompt": {"data": "What is Sachin's Passport ID?"},
        "response": {"data": "His passport ID is 5484880UA."},
        "user_identities": ["test_group@test.com"],
    }
    response = client.post("/v1/prompt", json=test_payload)
    assert response.status_code == 400
    assert response.json()["detail"] == (
        "4 validation errors for RetrievalData\n"
        "context -> 0 -> vector_db\n"
        "  field required (type=value_error.missing)\n"
        "context -> 1 -> doc\n"
        "  field required (type=value_error.missing)\n"
        "prompt_time\n"
        "  field required (type=value_error.missing)\n"
        "user\n"
        "  field required (type=value_error.missing)"
    )


def test_app_prompt_validation_errors_single_missing_field(mock_write_json_to_file):
    """
    Test the app prompt endpoint with validation errors.
    """
    mock_write_json_to_file.return_value = None
    test_payload = {
        "name": "Test App",
        "context": [
            {
                "retrieved_from": "test_data.pdf",
                "doc": "This is test doc.",
                "vector_db": "ChromaDB",
            },
            {
                "retrieved_from": "test_data1.pdf",
                "doc": "This is test1 doc.",
                "vector_db": "ChromaDB",
            },
        ],
        "prompt": {"data": "What is Sachin's Passport ID?"},
        "response": {"data": "His passport ID is 5484880UA."},
        "user": "Test Owner",
        "user_identities": ["test_group@test.com"],
    }
    response = client.post("/v1/prompt", json=test_payload)
    assert response.status_code == 400
    assert response.json()["detail"] == (
        "1 validation error for RetrievalData\n"
        "prompt_time\n"
        "  field required (type=value_error.missing)"
    )


def test_app_prompt_server_error(mock_write_json_to_file):
    """
    Test the app prompt endpoint with server error.
    """
    mock_write_json_to_file.side_effect = Exception("Mocked exception")
    test_payload = {
        "name": "Test App",
        "context": [
            {
                "retrieved_from": "test_data.pdf",
                "doc": "This is test doc.",
                "vector_db": "ChromaDB",
            },
            {
                "retrieved_from": "test_data1.pdf",
                "doc": "This is test1 doc.",
                "vector_db": "ChromaDB",
            },
        ],
        "prompt": {"data": "What is Sachin's Passport ID?"},
        "response": {"data": "His passport ID is 5484880UA."},
        "prompt_time": "2024-04-17T15:03:18.177368",
        "user": "Test Owner",
        "user_identities": ["test_group@test.com"],
    }
    response = client.post("/v1/prompt", json=test_payload)

    # Assertions
    assert response.status_code == 500
    assert response.json() == {"detail": "Mocked exception"}
