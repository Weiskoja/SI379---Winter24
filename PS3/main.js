//Timer for 10 seconds


const sel_img = document.querySelector('#selected-image');
const sel_title = document.querySelector('#selected-title');
const sel_date = document.querySelector('#selected-date');
const sel_location = document.querySelector('#selected-location');
const sel_description = document.querySelector('#selected-description');
const thumb_el = document.querySelector('#thumbnails');
const list_el = document.createElement('ul');

let um_timer = false;
let sel_index = 0;

const setSelectedIndex = (event_array, sel_index) => { 
    console.log(sel_index);
    const element = event_array[sel_index];
    document.querySelectorAll('.p_image').forEach(el => el.classList.remove('selected'));
    document.querySelector(`img[idx="${sel_index}"]`).classList.toggle('selected')
    sel_img.src = element.image_url;
    sel_title.textContent = element.event_title;
    sel_title.href = element.permalink;
    sel_date.textContent = element.datetime_start;
    sel_location.textContent = element.location;
    sel_description.textContent = element.description;

}


const um_events = () => {getUMEventsWithImages((event_array) =>{

    for(i = 0; i < event_array.length; i++){
        const event = event_array[i];
        const img_el = document.createElement('img');
        img_el.src = event.styled_images.event_thumb;
        img_el.setAttribute('idx', i);
        img_el.setAttribute('class', 'p_image');
        list_el.append(img_el);
        img_el.addEventListener('click', () => {
            clearInterval(um_timer);
            if(sel_index){
                document.querySelector(`img[idx="${sel_index}"]`).classList.remove('selected');
            };
            sel_index = img_el.getAttribute('idx');
            img_el.classList.toggle('selected');
            setSelectedIndex(event_array, sel_index);
            um_timer = setInterval(() => {
                // console.log(event_array);
                 setSelectedIndex(event_array, ((sel_index+1)%event_array.length));
                 sel_index++;
             }, 3000);         
        });
    };
    um_timer = setInterval(() => {
       // console.log(event_array);
        setSelectedIndex(event_array, ((sel_index+1)%event_array.length));
        sel_index++;
    }, 3000);
    
    });
    }


list_el.id = "list";
thumb_el.append(list_el);
um_events();
