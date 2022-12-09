function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.image-container').innerHTML = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;
  const number = document.querySelector('#number').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size, number);
}

async function generateImageRequest(prompt, size, number) {
  try {
    showSpinner();
    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
        numberOfImages: number,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    // console.log(data);

    const imageUrls = data.data;
    // document.querySelector('#image').src = imageUrl;

    const imageContainer = document.querySelector('.image-container');
    imageUrls.map((imageUrl) => {
      const image = document.createElement('img');
      image.setAttribute('id', 'image');
      image.src = imageUrl;
      imageContainer.appendChild(image);
    });

    removeSpinner();
  } catch (error) {
    const h2 = document.createElement('h2');
    h2.classList.add('msg');
    h2.textContent = error;
    // document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
