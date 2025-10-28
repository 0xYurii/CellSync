// Tab switching
function showTab(tabName) {
    document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
    });
    document.querySelectorAll(".tab").forEach((tab) => {
        tab.classList.remove("active");
    });
    document.getElementById(tabName).classList.add("active");
    event.target.classList.add("active");

    // Auto-load data for read tab
    if (tabName === "read") {
        loadAllPhones();
    }
}

// Helper function to show response
function showResponse(elementId, message, isSuccess) {
    const responseDiv = document.getElementById(elementId);
    responseDiv.className = `response ${isSuccess ? "success" : "error"}`;
    responseDiv.innerHTML = `<strong>${isSuccess ? "Success!" : "Error!"}</strong> ${message}`;
    responseDiv.style.display = "block";
    setTimeout(() => {
        responseDiv.style.display = "none";
    }, 5000);
}

// CREATE - Insert new phone
document
    .getElementById("createForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById("create_name").value,
            brand: document.getElementById("create_brand").value,
            price: parseFloat(
                document.getElementById("create_price").value,
            ),
            stock_quantity: parseInt(
                document.getElementById("create_stock").value,
            ),
            color: document.getElementById("create_color").value,
            storage:
                document.getElementById("create_storage").value,
        };

        try {
            const response = await fetch("/phones/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.text();
            showResponse("create_response", result, response.ok);
            if (response.ok) {
                document.getElementById("createForm").reset();
            }
        } catch (error) {
            showResponse("create_response", error.message, false);
        }
    });

// READ - Load all phones
async function loadAllPhones() {
    const loader = document.getElementById("read_loader");
    const listDiv = document.getElementById("phones_list");

    loader.style.display = "block";
    listDiv.innerHTML = "";

    try {
        const response = await fetch("/phones");
        const text = await response.text();

        // Try to parse as JSON
        try {
            const phones = JSON.parse(text);
            if (phones.length === 0) {
                listDiv.innerHTML =
                    '<p style="text-align: center; color: #999;">No phones found</p>';
            } else {
                listDiv.innerHTML = phones
                    .map(
                        (phone) => `
                <div class="phone-card">
                    <div class="phone-info">
                        <h3>${phone.name}</h3>
                        <p><strong>Brand:</strong> ${phone.brand} | <strong>Price:</strong> $${phone.price}</p>
                        <p><strong>Storage:</strong> ${phone.storage} | <strong>Color:</strong> ${phone.color} | <strong>Stock:</strong> ${phone.stock_quantity}</p>
                        <p style="font-size: 12px; color: #999;"><strong>ID:</strong> ${phone.id}</p>
                    </div>
                    <div class="phone-actions">
                        <button class="btn-warning" onclick="editPhone(${phone.id})">Edit</button>
                        <button class="btn-danger" onclick="quickDelete(${phone.id})">Delete</button>
                    </div>
                </div>
            `,
                    )
                    .join("");
            }
        } catch {
            // If not JSON, display as HTML
            listDiv.innerHTML = text;
        }
    } catch (error) {
        showResponse("read_response", error.message, false);
    } finally {
        loader.style.display = "none";
    }
}

// SEARCH - Search phones
document
    .getElementById("searchForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        const loader = document.getElementById("search_loader");
        const resultsDiv =
            document.getElementById("search_results");

        const brand = document.getElementById("search_brand").value;
        const minPrice =
            document.getElementById("search_minPrice").value;
        const maxPrice =
            document.getElementById("search_maxPrice").value;
        const storage =
            document.getElementById("search_storage").value;

        const params = new URLSearchParams();
        if (brand) params.append("brand", brand);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (storage) params.append("storage", storage);

        loader.style.display = "block";
        resultsDiv.innerHTML = "";

        try {
            const response = await fetch(
                `/phones/search?${params}`,
            );
            const text = await response.text();

            try {
                const phones = JSON.parse(text);
                if (phones.length === 0) {
                    resultsDiv.innerHTML =
                        '<p style="text-align: center; color: #999;">No phones found matching your criteria</p>';
                } else {
                    resultsDiv.innerHTML =
                        `<p style="margin-bottom: 15px; font-weight: bold;">Found ${phones.length} phone(s):</p>` +
                        phones
                            .map(
                                (phone) => `
                <div class="phone-card">
                    <div class="phone-info">
                        <h3>${phone.name}</h3>
                        <p><strong>Brand:</strong> ${phone.brand} | <strong>Price:</strong> $${phone.price}</p>
                        <p><strong>Storage:</strong> ${phone.storage} | <strong>Color:</strong> ${phone.color} | <strong>Stock:</strong> ${phone.stock_quantity}</p>
                        <p style="font-size: 12px; color: #999;"><strong>ID:</strong> ${phone.id}</p>
                    </div>
                </div>
            `,
                            )
                            .join("");
                }
            } catch {
                resultsDiv.innerHTML = text;
            }
        } catch (error) {
            showResponse("search_response", error.message, false);
        } finally {
            loader.style.display = "none";
        }
    });

// UPDATE - Load phone data
async function loadPhoneForUpdate() {
    const id = document.getElementById("update_id").value;
    if (!id) {
        showResponse(
            "update_response",
            "Please enter a phone ID",
            false,
        );
        return;
    }

    const loader = document.getElementById("update_loader");
    loader.style.display = "block";

    try {
        const response = await fetch(`/phones/${id}`);
        if (!response.ok) {
            throw new Error("Phone not found");
        }
        const phone = await response.json();

        document.getElementById("update_name").value = phone.name;
        document.getElementById("update_brand").value = phone.brand;
        document.getElementById("update_price").value = phone.price;
        document.getElementById("update_stock").value =
            phone.stock_quantity;
        document.getElementById("update_color").value = phone.color;
        document.getElementById("update_storage").value =
            phone.storage;

        document.getElementById("updateForm").style.display =
            "block";
        showResponse(
            "update_response",
            "Phone data loaded successfully!",
            true,
        );
    } catch (error) {
        showResponse("update_response", error.message, false);
    } finally {
        loader.style.display = "none";
    }
}

// UPDATE - Submit update
document
    .getElementById("updateForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("update_id").value;
        const formData = {
            name: document.getElementById("update_name").value,
            brand: document.getElementById("update_brand").value,
            price: parseFloat(
                document.getElementById("update_price").value,
            ),
            stock_quantity: parseInt(
                document.getElementById("update_stock").value,
            ),
            color: document.getElementById("update_color").value,
            storage:
                document.getElementById("update_storage").value,
        };

        try {
            const response = await fetch(`/phones/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            showResponse(
                "update_response",
                result.message || "Phone updated successfully!",
                response.ok,
            );
        } catch (error) {
            showResponse("update_response", error.message, false);
        }
    });

// DELETE - Load phone preview
async function loadPhoneForDelete() {
    const id = document.getElementById("delete_id").value;
    if (!id) {
        showResponse(
            "delete_response",
            "Please enter a phone ID",
            false,
        );
        return;
    }

    const loader = document.getElementById("delete_loader");
    const previewDiv = document.getElementById("delete_preview");

    loader.style.display = "block";
    previewDiv.innerHTML = "";

    try {
        const response = await fetch(`/phones/${id}`);
        if (!response.ok) {
            throw new Error("Phone not found");
        }
        const phone = await response.json();

        previewDiv.innerHTML = `
        <div class="phone-card" style="margin-top: 20px;">
            <div class="phone-info">
                <h3>${phone.name}</h3>
                <p><strong>Brand:</strong> ${phone.brand} | <strong>Price:</strong> $${phone.price}</p>
                <p><strong>Storage:</strong> ${phone.storage} | <strong>Color:</strong> ${phone.color} | <strong>Stock:</strong> ${phone.stock_quantity}</p>
            </div>
        </div>
        <button onclick="confirmDelete(${id})" class="btn-danger" style="margin-top: 15px;">⚠️ Confirm Delete</button>
    `;
    } catch (error) {
        showResponse("delete_response", error.message, false);
    } finally {
        loader.style.display = "none";
    }
}

// DELETE - Confirm deletion
async function confirmDelete(id) {
    if (!confirm("Are you sure you want to delete this phone?")) {
        return;
    }

    try {
        const response = await fetch(`/phones/${id}`, {
            method: "DELETE",
        });
        const result = await response.json();
        showResponse(
            "delete_response",
            result.message || "Phone deleted successfully!",
            response.ok,
        );
        document.getElementById("delete_preview").innerHTML = "";
        document.getElementById("delete_id").value = "";
    } catch (error) {
        showResponse("delete_response", error.message, false);
    }
}

// Quick edit from Read tab
function editPhone(id) {
    document.getElementById("update_id").value = id;
    showTab("update");
    document.querySelector(".tab:nth-child(4)").click();
    loadPhoneForUpdate();
}

// Quick delete from Read tab
async function quickDelete(id) {
    if (!confirm("Are you sure you want to delete this phone?")) {
        return;
    }

    try {
        const response = await fetch(`/phones/${id}`, {
            method: "DELETE",
        });
        const result = await response.json();
        showResponse(
            "read_response",
            result.message || "Phone deleted successfully!",
            response.ok,
        );
        loadAllPhones(); // Refresh the list
    } catch (error) {
        showResponse("read_response", error.message, false);
    }
}
