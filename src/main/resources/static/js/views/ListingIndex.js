import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function ListingIndex(props) {
    // language=HTML
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            <div class="container-fluid">
                <div id="posts-container">
                    ${props.posts.map(post => `<h3>${post.title}</h3>
                    <p>Author: ${post.author.username}</p>
                    <p>Categories: ${post.categories.map(category => category.name)}</p>
                    <p>${post.content}</p>
                    <button type="submit" class="btn btn-primary edit-post-btn" data-id="${post.id}">Edit Post</button>
                    <button type="submit" class="btn btn-primary delete-post-btn" data-id="${post.id}">Delete Post</button>
                    `).join('')}
                </div>

                <div id="add-post-container">
                    <form>
                        <div class="form-group">
                            <label for="add-post-title">Title</label>
                            <input type="text" class="form-control" id="add-post-title" placeholder="Enter Title">
                        </div>
                        <div class="form-group">
                            <label for="add-post-content">Content</label>
                            <textarea class="form-control" id="add-post-content" rows="3" placeholder="Enter Content"></textarea>
                        </div>
                        <div>
                            ${props.categories.map(category => `
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="category-${category.id}" value="${category.id}">
                                <label class="form-check-label" for="category-${category.id}">${category.name}</label>
                            </div>
                            `).join('')}
                        </div>
                        <button type="submit" class="btn btn-primary" id="add-post-btn">Submit New Post</button>
                    </form>
                </div>
            </div>
        </main>
    `;
}



export function ListingsEvent() {

}

