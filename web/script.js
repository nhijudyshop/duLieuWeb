// Constants
const API_BASE_URL =
    "https://tomato.tpos.vn/odata/ProductTemplate/OdataService.GetViewV2";
const STORAGE_KEY = "product_warehouse_data";
const BEARER_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDbGllbnRJZCI6InRtdFdlYkFwcCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiZmMwZjQ0MzktOWNmNi00ZDg4LWE4YzctNzU5Y2E4Mjk1MTQyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Im52MjAiLCJEaXNwbGF5TmFtZSI6IlTDuiIsIkF2YXRhclVybCI6IiIsIlNlY3VyaXR5U3RhbXAiOiI2NmQxNWRjMC03MTY3LTQzYjMtYTliNC00MjA2Yjk1NWM5YTIiLCJDb21wYW55SWQiOiIxIiwiVGVuYW50SWQiOiJ0b21hdG8udHBvcy52biIsIlJvbGVJZHMiOiI0MmZmYzk5Yi1lNGY2LTQwMDAtYjcyOS1hZTNmMDAyOGEyODksNmExZDAwMDAtNWQxYS0wMDE1LTBlNmMtMDhkYzM3OTUzMmU5LDc2MzlhMDQ4LTdjZmUtNDBiNS1hNDFkLWFlM2YwMDNiODlkZiw4YmM4ZjQ1YS05MWY4LTQ5NzMtYjE4Mi1hZTNmMDAzYWI4NTUsYTljMjAwMDAtNWRiNi0wMDE1LTQ1YWItMDhkYWIxYmZlMjIyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF14bqjbiBMw70gTWFpIiwiQ8OSSSIsIkNTS0ggLSBMw6BpIiwiS2hvIFBoxrDhu5tjLSBLaeG7h3QiLCJRdeG6o24gTMO9IEtobyAtIEJvIl0sImp0aSI6IjA2MjA1MjNhLTdjZjktNDE0NC1iMjU4LTVmZjljOTFhZTgzMyIsImlhdCI6IjE3NjE3OTcyNjEiLCJuYmYiOjE3NjE3OTcyNjEsImV4cCI6MTc2MzA5MzI2MSwiaXNzIjoiaHR0cHM6Ly90b21hdG8udHBvcy52biIsImF1ZCI6Imh0dHBzOi8vdG9tYXRvLnRwb3Mudm4saHR0cHM6Ly90cG9zLnZuIn0.vh9S_5VMnb1SnXO2i6M-MdYsTxaqXs3GbLmP6WLuuJA";

// Helper function: Generate variant code suffix from attribute value
function generateVariantSuffix(attributeValue, attributeType) {
    if (attributeType === "sizeNumber") {
        // Size số: Thêm "A" trước số
        // VD: "29" → "A29", "36" → "A36"
        return "A" + attributeValue;
    } else {
        // Màu hoặc Size chữ: Chữ cái đầu bỏ dấu uppercase
        // VD: "Đỏ" → "D", "Xanh Lá" → "X", "XL" → "X"

        // Bảng chuyển đổi tiếng Việt bỏ dấu
        const vietnameseMap = {
            à: "a",
            á: "a",
            ả: "a",
            ã: "a",
            ạ: "a",
            ă: "a",
            ằ: "a",
            ắ: "a",
            ẳ: "a",
            ẵ: "a",
            ặ: "a",
            â: "a",
            ầ: "a",
            ấ: "a",
            ẩ: "a",
            ẫ: "a",
            ậ: "a",
            đ: "d",
            è: "e",
            é: "e",
            ẻ: "e",
            ẽ: "e",
            ẹ: "e",
            ê: "e",
            ề: "e",
            ế: "e",
            ể: "e",
            ễ: "e",
            ệ: "e",
            ì: "i",
            í: "i",
            ỉ: "i",
            ĩ: "i",
            ị: "i",
            ò: "o",
            ó: "o",
            ỏ: "o",
            õ: "o",
            ọ: "o",
            ô: "o",
            ồ: "o",
            ố: "o",
            ổ: "o",
            ỗ: "o",
            ộ: "o",
            ơ: "o",
            ờ: "o",
            ớ: "o",
            ở: "o",
            ỡ: "o",
            ợ: "o",
            ù: "u",
            ú: "u",
            ủ: "u",
            ũ: "u",
            ụ: "u",
            ư: "u",
            ừ: "u",
            ứ: "u",
            ử: "u",
            ữ: "u",
            ự: "u",
            ỳ: "y",
            ý: "y",
            ỷ: "y",
            ỹ: "y",
            ỵ: "y",
        };

        // Lấy ký tự đầu tiên
        let firstChar = attributeValue.charAt(0).toLowerCase();

        // Bỏ dấu nếu là ký tự tiếng Việt
        if (vietnameseMap[firstChar]) {
            firstChar = vietnameseMap[firstChar];
        }

        return firstChar.toUpperCase();
    }
}

// Variant attribute lookup data
let variantAttributesData = {
    colors: {}, // Will store: { "Trắng": { Id: 6, AttributeId: 3, ... }, ... }
    sizeNumbers: {}, // Will store: { "29": { Id: 18, AttributeId: 4, ... }, ... }
    sizeText: {}, // Will store: { "S": { Id: 1, AttributeId: 1, ... }, ... }
};

// State
let productsData = {};

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
    loadFromStorage();
    setupEventListeners();

    // Auto load product if input has value - LUÔN FETCH MỚI
    const initialCode = document.getElementById("productCode").value.trim();
    if (initialCode) {
        // Luôn fetch mới từ API (không dùng localStorage cũ)
        fetchProduct(initialCode.toUpperCase());
    } else {
        // Nếu không có input value, render data có sẵn trong localStorage
        renderProducts();
    }

    // Setup modal tabs
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tabId = btn.dataset.tab;

            // Remove active from all tabs
            tabBtns.forEach((b) => b.classList.remove("active"));
            document
                .querySelectorAll(".tab-content")
                .forEach((c) => c.classList.remove("active"));

            // Add active to clicked tab
            btn.classList.add("active");
            document.getElementById("tab-" + tabId).classList.add("active");
        });
    });

    // Close modal when clicking outside
    const modal = document.getElementById("editModal");
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeEditModal();
        }
    });
});

// Setup event listeners
function setupEventListeners() {
    const addBtn = document.getElementById("addBtn");
    const productCodeInput = document.getElementById("productCode");

    addBtn.addEventListener("click", handleAddProduct);

    productCodeInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleAddProduct();
        }
    });
}

// Handle add product
async function handleAddProduct() {
    const code = document
        .getElementById("productCode")
        .value.trim()
        .toUpperCase();

    if (!code) {
        showError("Vui lòng nhập mã sản phẩm!");
        return;
    }

    await fetchProduct(code);
}

// Fetch product from API
async function fetchProduct(defaultCode) {
    showLoading();

    try {
        // WORKFLOW:
        // 1. Dùng GetViewV2 để SEARCH sản phẩm theo DefaultCode → lấy Id
        // 2. Dùng ProductTemplate(Id)?$expand để lấy FULL data (đầy đủ hơn)

        // Step 1: Search sản phẩm theo DefaultCode
        const params = new URLSearchParams({
            Active: "true",
            priceId: "0",
            DefaultCode: defaultCode,
            $top: "50",
            $orderby: "DateCreated desc",
            $filter: "Active eq true",
            $count: "true",
        });

        const url = `${API_BASE_URL}?${params.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.value && data.value.length > 0) {
            // Tìm sản phẩm khớp chính xác với DefaultCode
            const product = data.value.find(
                (p) => p.DefaultCode === defaultCode,
            );

            if (product) {
                // Store product data TẠM THỜI (sẽ được thay thế bởi data từ $expand)
                productsData[defaultCode] = {
                    template: product, // ← Template tạm (thiếu nested objects)
                    variants: [],
                    lastUpdated: new Date().toISOString(),
                };

                // Step 2: Fetch FULL data (Template + Variants) từ $expand API
                // → Template sẽ được THAY THẾ bằng data đầy đủ hơn
                await fetchVariants(product.Id, defaultCode);

                saveToStorage();
                renderProducts();

                showSuccess(`Đã thêm sản phẩm ${defaultCode} thành công!`);
            } else {
                showError(`Không tìm thấy sản phẩm với mã ${defaultCode}`);
            }
        } else {
            showError(`Không tìm thấy sản phẩm với mã ${defaultCode}`);
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        showError(`Lỗi khi tải sản phẩm: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// Fetch variants for a product
async function fetchVariants(productId, defaultCode) {
    try {
        // API endpoint với $expand để lấy FULL data (Template + ProductVariants)
        // Response từ API này có ĐẦY ĐỦ nested objects hơn GetViewV2
        const variantsUrl = `https://tomato.tpos.vn/odata/ProductTemplate(${productId})?$expand=UOM,UOMCateg,Categ,UOMPO,POSCateg,Taxes,SupplierTaxes,Product_Teams,Images,UOMView,Distributor,Importer,Producer,OriginCountry,ProductVariants($expand=UOM,Categ,UOMPO,POSCateg,AttributeValues)`;

        const response = await fetch(variantsUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();

            // QUAN TRỌNG: Response này có ĐẦY ĐỦ cả Template và ProductVariants
            // THAY THẾ template bằng data từ API này (đầy đủ hơn GetViewV2)
            productsData[defaultCode].template = data;

            if (data.ProductVariants && data.ProductVariants.length > 0) {
                productsData[defaultCode].variants = data.ProductVariants;
                console.log(`✅ Đã lấy FULL data cho ${defaultCode}:`);
                console.log(`   - Template: ✅ (với đầy đủ nested objects)`);
                console.log(
                    `   - ProductVariants: ${data.ProductVariants.length} biến thể`,
                );
            } else {
                console.log(
                    `✅ Đã lấy template cho ${defaultCode} (không có variants)`,
                );
            }
        }
    } catch (error) {
        console.error("Error fetching full product data:", error);
        // Continue without variants
    }
}

// Render all products
function renderProducts() {
    const container = document.getElementById("productList");

    if (Object.keys(productsData).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>📦 Chưa có sản phẩm nào</p>
                <p style="font-size: 14px; opacity: 0.8;">Nhập mã sản phẩm và nhấn "Thêm" để bắt đầu</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    Object.values(productsData).forEach((data) => {
        const productCard = createProductCard(data);
        container.appendChild(productCard);
    });
}

// Create product card
function createProductCard(data) {
    const product = data.template;
    const variants = data.variants || [];

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <div class="product-header">
            <img src="${product.ImageUrl || "https://via.placeholder.com/120"}" 
                 alt="${product.Name}" 
                 class="product-image"
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/120?text=No+Image'">
            
            <div class="product-info">
                <div class="product-title">${product.Name}</div>
                <div class="product-code">${product.DefaultCode}</div>
                
                <div class="product-details">
                    <div class="detail-item">
                        <span class="detail-label">Giá Bán</span>
                        <span class="detail-value price-sell">${formatCurrency(product.ListPrice)}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Giá Mua</span>
                        <span class="detail-value price-buy">${formatCurrency(product.PurchasePrice)}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Số Lượng Thực Tế</span>
                        <span class="detail-value quantity">${Math.floor(product.QtyAvailable)}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Số Lượng Dự Báo</span>
                        <span class="detail-value">${Math.floor(product.VirtualAvailable)}</span>
                    </div>
                    
                    <div class="detail-item">
                        <span class="detail-label">Số Biến Thể</span>
                        <span class="detail-value">${variants.length || product.VariantActiveCount || 0}</span>
                    </div>
                </div>
            </div>
            
            <button class="btn-edit" onclick="editProduct('${product.DefaultCode}')">
                <span>✏️</span> Chỉnh sửa
            </button>
        </div>
        
        ${variants.length > 0 ? createVariantsTable(variants, product.ImageUrl) : ""}
    `;

    return card;
}

// Create variants table
function createVariantsTable(variants, productImageUrl) {
    return `
        <div class="variants-section">
            <div class="variants-header">
                <span>📋</span> Danh Sách Các Biến Thể
            </div>
            <table class="variants-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>HÌNH ẢNH</th>
                        <th>TÊN BIẾN THẾ</th>
                        <th>MÃ SP CON</th>
                        <th>ID SP CHA</th>
                        <th>GIÁ BÁN</th>
                        <th>GIÁ MUA</th>
                        <th>SL THỰC TẾ</th>
                        <th>SL DỰ BÁO</th>
                    </tr>
                </thead>
                <tbody>
                    ${variants
                        .map(
                            (variant) => `
                        <tr>
                            <td>${variant.Id}</td>
                            <td>
                                <img src="${productImageUrl || "https://via.placeholder.com/50"}" 
                                     alt="${variant.Name || variant.NameGet}" 
                                     class="variant-image"
                                     onerror="this.onerror=null; this.src='https://via.placeholder.com/50?text=No'">
                            </td>
                            <td class="variant-name">${variant.NameGet || variant.Name}</td>
                            <td class="variant-code">${variant.DefaultCode || "-"}</td>
                            <td>${variant.ProductTmplId || "-"}</td>
                            <td class="detail-value price-sell">${formatCurrency(variant.ListPrice || variant.PriceVariant || 0)}</td>
                            <td class="detail-value price-buy">${formatCurrency(variant.StandardPrice || variant.PurchasePrice || 0)}</td>
                            <td class="detail-value quantity">${Math.floor(variant.QtyAvailable || 0)}</td>
                            <td class="detail-value quantity">${Math.floor(variant.VirtualAvailable || 0)}</td>
                        </tr>
                    `,
                        )
                        .join("")}
                </tbody>
            </table>
        </div>
    `;
}

// Format currency
function formatCurrency(amount) {
    if (!amount && amount !== 0) return "0 đ";
    return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
}

// Storage functions
function loadFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            productsData = JSON.parse(stored);
        }
    } catch (error) {
        console.error("Error loading from storage:", error);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData));
    } catch (error) {
        console.error("Error saving to storage:", error);
    }
}

// UI feedback functions
function showLoading() {
    const container = document.getElementById("productList");
    container.innerHTML = '<div class="loading">⏳ Đang tải dữ liệu...</div>';
}

function hideLoading() {
    // Loading will be replaced by renderProducts()
}

function showError(message) {
    const container = document.getElementById("productList");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = "❌ " + message;

    container.insertBefore(errorDiv, container.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const container = document.getElementById("productList");
    const successDiv = document.createElement("div");
    successDiv.className = "error";
    successDiv.style.background = "#d4edda";
    successDiv.style.color = "#155724";
    successDiv.textContent = "✅ " + message;

    container.insertBefore(successDiv, container.firstChild);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Edit product function
function editProduct(defaultCode) {
    const productData = productsData[defaultCode];
    if (!productData) {
        showError("Không tìm thấy dữ liệu sản phẩm!");
        return;
    }

    const product = productData.template;
    const variants = productData.variants || [];

    // Fill data vào modal
    document.getElementById("edit-name").value = product.Name || "";
    document.getElementById("edit-image").src =
        product.ImageUrl || "https://via.placeholder.com/120";

    // Tạo text biến thể từ variants
    const variantsText = createVariantsText(variants);
    document.getElementById("edit-variants-text").value = variantsText;

    document.getElementById("edit-purchase-price").value =
        product.PurchasePrice || 0;
    document.getElementById("edit-sale-price").value = product.ListPrice || 0;
    document.getElementById("edit-qty-available").value = Math.floor(
        product.QtyAvailable || 0,
    );
    document.getElementById("edit-qty-forecast").value = Math.floor(
        product.VirtualAvailable || 0,
    );

    // Fill variants table
    fillVariantsEditTable(variants);

    // Store current editing product
    window.currentEditingProduct = defaultCode;

    // Store product code in modal dataset for variant selection
    const modal = document.getElementById("editModal");
    modal.dataset.productCode = defaultCode;

    // Show modal
    openEditModal();
}

// Create variants text from variants array
function createVariantsText(variants) {
    if (!variants || variants.length === 0) {
        return "Không có biến thể";
    }

    // Collect unique attribute values
    const attributes = {};

    variants.forEach((variant) => {
        if (variant.AttributeValues && variant.AttributeValues.length > 0) {
            variant.AttributeValues.forEach((attr) => {
                const attrName = attr.AttributeName;
                const attrValue = attr.Name;

                if (!attributes[attrName]) {
                    attributes[attrName] = new Set();
                }
                attributes[attrName].add(attrValue);
            });
        }
    });

    // Create text
    const parts = [];
    for (const [attrName, values] of Object.entries(attributes)) {
        const valuesList = Array.from(values).join(" | ");
        parts.push(`(${valuesList})`);
    }

    return parts.join(" ") || "Không có thuộc tính";
}

// Fill variants edit table
function fillVariantsEditTable(variants) {
    const tbody = document.getElementById("variants-edit-body");
    tbody.innerHTML = "";

    if (!variants || variants.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">Không có biến thể</td></tr>';
        return;
    }

    variants.forEach((variant, index) => {
        const row = document.createElement("tr");
        // SỬ DỤNG ID THỰC CỦA VARIANT, KHÔNG DÙNG INDEX
        row.setAttribute("data-variant-id", variant.Id);

        row.innerHTML = `
            <td>
                <input type="text" 
                       class="variant-input variant-name-input" 
                       value="${variant.NameGet || variant.Name || ""}"
                       data-field="name"
                       data-variant-id="${variant.Id}"
                       placeholder="Tên biến thể"
                       style="width: 100%; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 13px;">
            </td>
            <td style="color: #667eea; font-weight: 600;">${variant.DefaultCode || "-"}</td>
            <td>
                <input type="number" 
                       class="variant-input variant-price-input" 
                       value="${Math.floor(variant.ListPrice || variant.PriceVariant || 0)}"
                       data-field="price"
                       data-variant-id="${variant.Id}"
                       placeholder="Giá"
                       style="width: 100%; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px; font-size: 13px; font-weight: 600;">
            </td>
            <td style="color: #10b981; font-weight: 600;">${Math.floor(variant.QtyAvailable || 0)}</td>
        `;
        tbody.appendChild(row);
    });

    console.log(
        "📋 Filled variants table with IDs:",
        variants.map((v) => v.Id),
    );
}

// Open edit modal
function openEditModal() {
    const modal = document.getElementById("editModal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById("editModal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    window.currentEditingProduct = null;
}

// Create API payload from product data
function createUpdatePayload(productData) {
    const template = productData.template;
    const variants = productData.variants || [];

    // QUAN TRỌNG: Spread toàn bộ template, sau đó loại bỏ những fields API không chấp nhận
    const {
        VariantActiveCount, // ❌ Loại bỏ - API không chấp nhận
        ...templateClean
    } = template;

    // Log fields bị loại bỏ
    if (VariantActiveCount !== undefined) {
        console.log(
            "🗑️ Loại bỏ field không hợp lệ ở Template:",
            "VariantActiveCount =",
            VariantActiveCount,
        );
    }

    const payload = {
        ...templateClean, // ★★★ Spread template đã loại bỏ fields không hợp lệ

        // Override những field cần thiết
        Version: 0, // CRITICAL: Version phải luôn là 0 khi update
        LastUpdated: template.LastUpdated, // GIỮ NGUYÊN LastUpdated từ API

        // ProductVariants: Map từng variant, giữ nguyên tất cả fields
        ProductVariants: variants.map((v, index) => {
            // Loại bỏ các fields không hợp lệ ở variant level
            const {
                VariantActiveCount: variantActiveCount, // ❌ Loại bỏ nếu có
                ...variantClean
            } = v;

            // Log fields bị loại bỏ
            if (variantActiveCount !== undefined) {
                console.log(
                    `🗑️ Loại bỏ field không hợp lệ ở Variant #${index + 1}:`,
                    "VariantActiveCount =",
                    variantActiveCount,
                );
            }

            return {
                ...variantClean, // ★★★ Spread variant đã loại bỏ fields không hợp lệ

                // Override những field cần thiết
                Version: 0, // CRITICAL: Version phải luôn là 0
                LastUpdated: v.LastUpdated, // GIỮ NGUYÊN LastUpdated từ API
            };
        }),
    };

    return payload;
}

// Save product
async function saveProduct() {
    if (!window.currentEditingProduct) {
        showError("Không có sản phẩm đang chỉnh sửa!");
        return;
    }

    const defaultCode = window.currentEditingProduct;
    const productData = productsData[defaultCode];

    if (!productData) {
        showError("Không tìm thấy dữ liệu sản phẩm!");
        return;
    }

    // Show loading overlay
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.classList.add("active");

    try {
        // STEP 1: Process variant changes first (add/delete variants)
        if (productData.variantChanges) {
            const changes = productData.variantChanges;

            // Kiểm tra xem CÓ THỰC SỰ có thay đổi không
            const hasAdditions =
                changes.added.colors.length > 0 ||
                changes.added.sizeNumbers.length > 0 ||
                changes.added.sizeText.length > 0;
            const hasRemovals = changes.removed.variantIds.length > 0;

            if (hasAdditions || hasRemovals) {
                console.log("🔄 Processing variant changes...");
                console.log(
                    `   - ${changes.removed.variantIds.length} variants sẽ XÓA`,
                );
                console.log(
                    `   - ${changes.added.colors.length + changes.added.sizeNumbers.length + changes.added.sizeText.length} attributes MỚI sẽ TẠO`,
                );

                await processVariantChanges(defaultCode);

                // Refresh product data from API to get updated variants
                console.log("🔄 Refreshing product data from API...");
                await fetchVariants(productData.template.Id, defaultCode);
            } else {
                console.log(
                    "ℹ️ Không có thay đổi variants → BỎ QUA bước tạo/xóa variants",
                );
                // Clear variantChanges vì không có gì để làm
                delete productData.variantChanges;
            }
        }

        // STEP 2: Update template and variant prices/names
        // Update template data
        const newPurchasePrice =
            parseFloat(document.getElementById("edit-purchase-price").value) ||
            0;
        const newSalePrice =
            parseFloat(document.getElementById("edit-sale-price").value) || 0;

        productData.template.PurchasePrice = newPurchasePrice;
        productData.template.ListPrice = newSalePrice;

        // Update variants data from inputs - MATCH BY ID
        const variantRows = document.querySelectorAll(
            "#variants-edit-body tr[data-variant-id]",
        );
        variantRows.forEach((row) => {
            const variantId = parseInt(row.getAttribute("data-variant-id"));
            const nameInput = row.querySelector(".variant-name-input");
            const priceInput = row.querySelector(".variant-price-input");

            // Find variant by ID (not index!)
            const variant = productData.variants.find(
                (v) => v.Id === variantId,
            );

            if (variant) {
                console.log(`🔄 Updating variant ID ${variantId}:`, {
                    oldName: variant.NameGet,
                    oldPriceVariant: variant.PriceVariant,
                    oldListPrice: variant.ListPrice,
                });

                // Update variant name
                if (nameInput) {
                    const newName = nameInput.value.trim();
                    if (newName) {
                        variant.NameGet = newName;
                        // Extract display name without code prefix if exists
                        const namePart = newName.includes("]")
                            ? newName.split("]")[1].trim()
                            : newName;
                        variant.Name = namePart;
                    }
                }

                // Update variant price - CẬP NHẬT TRƯỜNG PriceVariant
                if (priceInput) {
                    const newPrice = parseFloat(priceInput.value) || 0;
                    variant.PriceVariant = newPrice; // ★ Giá biến thể - TRƯỜNG CHÍNH
                    variant.ListPrice = newPrice; // Giá bán (đồng bộ)
                    // QUAN TRỌNG: KHÔNG set LstPrice - giữ nguyên từ API
                }

                // QUAN TRỌNG: KHÔNG update LastUpdated - sẽ giữ nguyên từ API trong payload

                console.log(`✅ Updated variant ID ${variantId}:`, {
                    newName: variant.NameGet,
                    newPrice: variant.PriceVariant,
                    listPrice: variant.ListPrice,
                });
            } else {
                console.warn(`⚠️ Variant ID ${variantId} not found!`);
            }
        });

        // Prepare payload for API (based on the template structure)
        const payload = createUpdatePayload(productData);

        console.log("📤 Sending payload to API:");
        console.log("- Template ListPrice:", payload.ListPrice);
        console.log("- Template PurchasePrice:", payload.PurchasePrice);
        console.log("- Template Version:", payload.Version, "(phải là 0)");
        console.log(
            "- Template LastUpdated:",
            payload.LastUpdated,
            "(giữ nguyên từ API)",
        );
        console.log("- ProductVariants count:", payload.ProductVariants.length);

        // Log chi tiết từng variant với giá - QUAN TRỌNG: PriceVariant là trường chính
        console.log(
            "\n🔍 Chi tiết giá các biến thể (PriceVariant = Trường chính):",
        );
        payload.ProductVariants.forEach((v, index) => {
            console.log(`\n  Variant #${index + 1} (ID: ${v.Id}):`);
            console.log(`    - NameGet: ${v.NameGet}`);
            console.log(
                `    - PriceVariant: ${v.PriceVariant} ★★★ TRƯỜNG CHÍNH`,
            );
            console.log(`    - ListPrice: ${v.ListPrice}`);
            console.log(`    - LstPrice: ${v.LstPrice} (giữ nguyên từ API)`);
            console.log(`    - Version: ${v.Version} (phải là 0)`);
            console.log(`    - LastUpdated: ${v.LastUpdated} (giữ nguyên)`);
        });

        console.log(
            "\n📋 Full payload structure:",
            JSON.stringify(payload, null, 2),
        );

        // POST to API
        const response = await fetch(
            "https://tomato.tpos.vn/odata/ProductTemplate/ODataService.UpdateV2",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            },
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ API Error Response:", errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log("✅ API Response:", result);

        // Update last modified timestamp
        productData.lastUpdated = new Date().toISOString();

        // Save to localStorage after successful API update
        saveToStorage();

        // Re-render
        renderProducts();

        // Hide loading overlay
        loadingOverlay.classList.remove("active");

        // Close modal
        closeEditModal();

        showSuccess("✅ Đã lưu thay đổi lên server thành công!");
    } catch (error) {
        console.error("❌ Error saving product:", error);

        // Hide loading overlay
        loadingOverlay.classList.remove("active");

        showError(`❌ Lỗi khi lưu: ${error.message}`);
    }
}

// Export for debugging
window.productsData = productsData;
window.refreshProducts = () => {
    Object.keys(productsData).forEach((code) => {
        fetchProduct(code);
    });
};

// ==================== VARIANT MANAGEMENT (ADD/DELETE) ====================

// Delete a variant by ID
async function deleteVariant(variantId) {
    try {
        console.log(`🗑️ Deleting variant ${variantId}...`);

        const response = await fetch(
            `https://tomato.tpos.vn/odata/Product(${variantId})`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    "Content-Type": "application/json",
                },
            },
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to delete variant ${variantId}: ${errorText}`,
            );
        }

        console.log(`✅ Deleted variant ${variantId}`);
        return true;
    } catch (error) {
        console.error(`❌ Error deleting variant ${variantId}:`, error);
        throw error;
    }
}

// Add a new variant (CHỈ AddVariant, tự động sinh mã)
async function addVariant(
    productTemplateId,
    templateName,
    templateCode,
    attributeValues,
    retrySuffix = "",
) {
    try {
        console.log(`➕ Adding variant with attributes:`, attributeValues);

        // Xác định loại attribute và giá trị
        const attrValue = attributeValues[0].Name;
        const attrId = attributeValues[0].AttributeId;
        let attributeType = "color"; // default

        if (attrId === 4) {
            attributeType = "sizeNumber"; // Size Số
        } else if (attrId === 1) {
            attributeType = "sizeText"; // Size Chữ
        } else if (attrId === 3) {
            attributeType = "color"; // Màu
        }

        // Generate variant code suffix
        const suffix = generateVariantSuffix(attrValue, attributeType);
        const variantCode = templateCode + suffix + retrySuffix;

        // Generate variant name
        const variantName = `${templateName} (${attrValue})`;
        const variantNameGet = `[${variantCode}] ${variantName}`;

        console.log(`🔍 Sinh mã variant:`);
        console.log(`   - Template Code: ${templateCode}`);
        console.log(`   - Attribute: ${attrValue} (${attributeType})`);
        console.log(`   - Suffix: ${suffix}`);
        console.log(`   - Retry Suffix: ${retrySuffix || "(none)"}`);
        console.log(`   - Variant Code: ${variantCode}`);
        console.log(`   - Variant NameGet: ${variantNameGet}`);

        // Tạo payload với mã đã sinh
        const addPayload = {
            ...ADD_VARIANT_PAYLOAD_TEMPLATE,
            ProductTmplId: productTemplateId,
            DefaultCode: variantCode, // ✅ Mã variant
            Barcode: variantCode, // ✅ Barcode = DefaultCode
            Name: variantName, // VD: "TEST55 (Đỏ)"
            NameGet: variantNameGet, // VD: "[TEST55D] TEST55 (Đỏ)"
            AttributeValues: attributeValues,
        };

        console.log("📤 AddVariant payload:", addPayload);

        // Gọi API AddVariant (CHỈ 1 API call)
        const addResponse = await fetch(
            `https://tomato.tpos.vn/odata/ProductTemplate(${productTemplateId})/ODataService.AddVariant`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addPayload),
            },
        );

        if (!addResponse.ok) {
            const errorText = await addResponse.text();

            // Kiểm tra xem có phải lỗi mã trùng không
            let errorData = null;
            try {
                errorData = JSON.parse(errorText);
            } catch (e) {
                // Không phải JSON, throw error gốc
                throw new Error(`AddVariant failed: ${errorText}`);
            }

            // Nếu là lỗi mã biến thể hoặc mã vạch đã tồn tại
            if (
                errorData.error &&
                errorData.error.message &&
                (errorData.error.message.includes("Mã biến thể đã tồn tại") ||
                    errorData.error.message.includes("Mã vạch đã tồn tại"))
            ) {
                console.warn(`⚠️ Mã variant bị trùng: ${variantCode}`);

                // Tính toán retry suffix mới: thêm '1' vào cuối
                // VD: '' → '1' → '11' → '111' → '1111' ...
                let newSuffix = retrySuffix ? retrySuffix + "1" : "1";

                // Giới hạn độ dài để tránh mã quá dài
                if (newSuffix.length > 10) {
                    throw new Error(
                        `Không thể tạo variant sau ${newSuffix.length} lần thử: ${variantCode}`,
                    );
                }

                console.log(`🔄 Retry với suffix: ${newSuffix}`);

                // Retry với suffix mới
                return await addVariant(
                    productTemplateId,
                    templateName,
                    templateCode,
                    attributeValues,
                    newSuffix,
                );
            }

            // Lỗi khác, throw error
            throw new Error(`AddVariant failed: ${errorText}`);
        }

        const addResult = await addResponse.json();
        console.log("✅ AddVariant response:", addResult);
        console.log(`✅ Đã tạo variant: ${variantCode}`);

        return addResult;
    } catch (error) {
        console.error("❌ Error adding variant:", error);
        throw error;
    }
}

// Process variant changes (delete removed, add new ones)
async function processVariantChanges(productCode) {
    const productData = productsData[productCode];
    if (!productData || !productData.variantChanges) {
        console.log("ℹ️ No variant changes to process");
        return;
    }

    const changes = productData.variantChanges;
    const template = productData.template;
    const productTemplateId = template.Id;
    const templateName = template.Name;
    const templateCode = template.DefaultCode; // ✅ Mã sản phẩm cha

    try {
        // Step 1: Delete removed variants
        if (changes.removed.variantIds.length > 0) {
            console.log(
                `🗑️ Deleting ${changes.removed.variantIds.length} variants...`,
            );

            for (const variantId of changes.removed.variantIds) {
                await deleteVariant(variantId);
            }

            console.log("✅ All removals completed");
        }

        // Step 2: Add new variants
        const addedAttrs = [
            ...changes.added.colors,
            ...changes.added.sizeNumbers,
            ...changes.added.sizeText,
        ];

        if (addedAttrs.length > 0) {
            console.log(
                `➕ Sẽ tạo ${addedAttrs.length} variants MỚI (CHỈ gọi API cho attributes MỚI):`,
                addedAttrs,
            );

            // Build attribute values array for each added attribute
            for (let i = 0; i < addedAttrs.length; i++) {
                const attrValue = addedAttrs[i];
                console.log(
                    `\n[${i + 1}/${addedAttrs.length}] Đang tạo variant cho attribute MỚI: "${attrValue}"`,
                );

                // Find the attribute data from VARIANT_ATTRIBUTES
                let attrData = null;

                if (VARIANT_ATTRIBUTES.colors[attrValue]) {
                    attrData = VARIANT_ATTRIBUTES.colors[attrValue];
                } else if (VARIANT_ATTRIBUTES.sizeNumbers[attrValue]) {
                    attrData = VARIANT_ATTRIBUTES.sizeNumbers[attrValue];
                } else if (VARIANT_ATTRIBUTES.sizeText[attrValue]) {
                    attrData = VARIANT_ATTRIBUTES.sizeText[attrValue];
                }

                if (!attrData) {
                    console.warn(
                        `⚠️ Attribute data not found for: ${attrValue}`,
                    );
                    continue;
                }

                // Create attribute value object
                const attributeValues = [
                    {
                        Id: attrData.Id,
                        Name: attrValue,
                        Code: attrData.Code,
                        Sequence: null,
                        AttributeId: attrData.AttributeId,
                        AttributeName:
                            attrData.AttributeId === 3
                                ? "Màu"
                                : attrData.AttributeId === 4
                                  ? "Size Số"
                                  : "Size Chữ",
                        PriceExtra: null,
                        NameGet: `${
                            attrData.AttributeId === 3
                                ? "Màu"
                                : attrData.AttributeId === 4
                                  ? "Size Số"
                                  : "Size Chữ"
                        }: ${attrValue}`,
                        DateCreated: null,
                    },
                ];

                console.log(`   ✅ Gọi API AddVariant cho "${attrValue}"`);
                await addVariant(
                    productTemplateId,
                    templateName,
                    templateCode,
                    attributeValues,
                );
                console.log(`   ✅ Hoàn thành tạo variant cho "${attrValue}"`);
            }

            console.log(`✅ Đã tạo xong ${addedAttrs.length} variants MỚI`);
        } else {
            console.log(
                "ℹ️ Không có attributes MỚI → BỎ QUA bước tạo variants",
            );
        }

        // Clear variant changes after processing
        delete productData.variantChanges;
        saveToStorage();

        console.log("\n🎉 Hoàn thành xử lý thay đổi variants!");
        console.log("   📊 Tóm tắt:");
        console.log(
            `      - Đã xóa: ${changes.removed.variantIds.length} variants`,
        );
        console.log(`      - Đã tạo: ${addedAttrs.length} variants MỚI`);
        console.log(
            "   💡 CHỈ gọi API cho variants/attributes MỚI hoặc bị XÓA",
        );
    } catch (error) {
        console.error("❌ Error processing variant changes:", error);
        throw error;
    }
}

// ==================== SELECT VARIANTS MODAL ====================

let currentEditingProductCode = null;
let initialVariantState = null; // Track initial state when modal opens

// Open select variants modal
function openSelectVariantsModal() {
    const modal = document.getElementById("selectVariantsModal");
    modal.classList.add("active");

    // Get current product code from edit modal
    const editModal = document.getElementById("editModal");
    const productCode = editModal.dataset.productCode;
    currentEditingProductCode = productCode;

    // Save initial state for tracking changes
    const productData = productsData[productCode];
    initialVariantState = {
        colors: new Set(),
        sizeNumbers: new Set(),
        sizeText: new Set(),
        variantIds: new Map(), // Map attribute value to variant IDs
    };

    // Build initial state from existing variants
    if (productData && productData.variants) {
        productData.variants.forEach((variant) => {
            if (variant.AttributeValues && variant.AttributeValues.length > 0) {
                variant.AttributeValues.forEach((attr) => {
                    const value = attr.Name || attr.Value;

                    // Store which variant IDs have which attribute values
                    if (!initialVariantState.variantIds.has(value)) {
                        initialVariantState.variantIds.set(value, []);
                    }
                    initialVariantState.variantIds.get(value).push(variant.Id);

                    // Categorize
                    if (
                        [
                            "Cà Phê",
                            "Hồng Đào",
                            "Hồng Đất",
                            "Tím Đậm",
                            "Sọc Trắng To",
                            "Beo",
                            "SỌC NÂU",
                            "SỌC ĐỎ",
                            "Trắng",
                            "Đen",
                            "Đỏ",
                            "Vàng",
                            "Xám",
                            "Xanh Lá",
                        ].includes(value)
                    ) {
                        initialVariantState.colors.add(value);
                    } else if (
                        [
                            "29",
                            "30",
                            "31",
                            "32",
                            "1",
                            "2",
                            "3",
                            "35",
                            "36",
                            "37",
                            "38",
                        ].includes(value)
                    ) {
                        initialVariantState.sizeNumbers.add(value);
                    } else if (
                        ["XXXL", "XXL", "S", "M", "L", "XL"].includes(value)
                    ) {
                        initialVariantState.sizeText.add(value);
                    }
                });
            }
        });
    }

    console.log("📸 Initial variant state:", {
        colors: Array.from(initialVariantState.colors),
        sizeNumbers: Array.from(initialVariantState.sizeNumbers),
        sizeText: Array.from(initialVariantState.sizeText),
        variantIds: Object.fromEntries(initialVariantState.variantIds),
    });

    // Load existing variants and pre-select checkboxes
    loadExistingVariants(productCode);
}

// Close select variants modal
function closeSelectVariantsModal() {
    const modal = document.getElementById("selectVariantsModal");
    modal.classList.remove("active");
    currentEditingProductCode = null;
}

// Load existing variants and check corresponding checkboxes
function loadExistingVariants(productCode) {
    const productData = productsData[productCode];
    if (!productData) {
        uncheckAllVariants();
        clearVariantQuantities();
        return;
    }

    // Uncheck all first and clear quantities
    uncheckAllVariants();
    clearVariantQuantities();

    // Priority 1: Load from saved selections (if user has manually selected variants)
    if (productData.selectedVariants) {
        console.log(
            "📋 Loading from saved selections:",
            productData.selectedVariants,
        );

        const {
            colors = [],
            sizeNumbers = [],
            sizeText = [],
        } = productData.selectedVariants;

        // Check and display for colors
        colors.forEach((color) => {
            const label = document.querySelector(
                `#color-options label:has(input[value="${color}"])`,
            );
            if (label) {
                const checkbox = label.querySelector('input[type="checkbox"]');
                checkbox.checked = true;

                // Calculate quantity for this color from actual variants
                const qty = calculateVariantQuantity(
                    productData,
                    color,
                    "color",
                );
                updateVariantQuantityDisplay(label, qty);

                if (qty > 0) {
                    checkbox.disabled = true;
                    label.style.opacity = "0.7";
                    label.style.cursor = "not-allowed";
                }
            }
        });

        // Check and display for size numbers
        sizeNumbers.forEach((size) => {
            const label = document.querySelector(
                `#size-number-options label:has(input[value="${size}"])`,
            );
            if (label) {
                const checkbox = label.querySelector('input[type="checkbox"]');
                checkbox.checked = true;

                const qty = calculateVariantQuantity(
                    productData,
                    size,
                    "sizeNumber",
                );
                updateVariantQuantityDisplay(label, qty);

                if (qty > 0) {
                    checkbox.disabled = true;
                    label.style.opacity = "0.7";
                    label.style.cursor = "not-allowed";
                }
            }
        });

        // Check and display for size text
        sizeText.forEach((size) => {
            const label = document.querySelector(
                `#size-text-options label:has(input[value="${size}"])`,
            );
            if (label) {
                const checkbox = label.querySelector('input[type="checkbox"]');
                checkbox.checked = true;

                const qty = calculateVariantQuantity(
                    productData,
                    size,
                    "sizeText",
                );
                updateVariantQuantityDisplay(label, qty);

                if (qty > 0) {
                    checkbox.disabled = true;
                    label.style.opacity = "0.7";
                    label.style.cursor = "not-allowed";
                }
            }
        });

        return;
    }

    // Priority 2: Load from actual variants (from API)
    if (!productData.variants || productData.variants.length === 0) {
        return;
    }

    // Collect all unique attribute values from all variants and calculate total QtyAvailable
    const colorQty = {};
    const sizeNumberQty = {};
    const sizeTextQty = {};

    productData.variants.forEach((variant) => {
        const qty = variant.QtyAvailable || 0;

        if (variant.AttributeValues && variant.AttributeValues.length > 0) {
            variant.AttributeValues.forEach((attr) => {
                const value = attr.Name || attr.Value;

                // Categorize by attribute type (heuristic)
                // Colors: các màu sắc
                if (
                    [
                        "Cà Phê",
                        "Hồng Đào",
                        "Hồng Đất",
                        "Tím Đậm",
                        "Sọc Trắng To",
                        "Beo",
                        "SỌC NÂU",
                        "SỌC ĐỎ",
                        "Trắng",
                        "Đen",
                        "Đỏ",
                        "Vàng",
                        "Xám",
                        "Xanh Lá",
                    ].includes(value)
                ) {
                    colorQty[value] = (colorQty[value] || 0) + qty;
                }
                // Size numbers
                else if (
                    [
                        "29",
                        "30",
                        "31",
                        "32",
                        "1",
                        "2",
                        "3",
                        "35",
                        "36",
                        "37",
                        "38",
                    ].includes(value)
                ) {
                    sizeNumberQty[value] = (sizeNumberQty[value] || 0) + qty;
                }
                // Size text
                else if (["XXXL", "XXL", "S", "M", "L", "XL"].includes(value)) {
                    sizeTextQty[value] = (sizeTextQty[value] || 0) + qty;
                }
            });
        }
    });

    console.log("📋 Loaded variants from API with quantities:", {
        colors: colorQty,
        sizeNumbers: sizeNumberQty,
        sizeText: sizeTextQty,
    });

    // Check corresponding checkboxes and display quantities
    Object.entries(colorQty).forEach(([color, qty]) => {
        const label = document.querySelector(
            `#color-options label:has(input[value="${color}"])`,
        );
        if (label) {
            const checkbox = label.querySelector('input[type="checkbox"]');
            checkbox.checked = true;

            // Display quantity
            updateVariantQuantityDisplay(label, qty);

            // Disable if qty > 0
            if (qty > 0) {
                checkbox.disabled = true;
                label.style.opacity = "0.7";
                label.style.cursor = "not-allowed";
            }
        }
    });

    Object.entries(sizeNumberQty).forEach(([size, qty]) => {
        const label = document.querySelector(
            `#size-number-options label:has(input[value="${size}"])`,
        );
        if (label) {
            const checkbox = label.querySelector('input[type="checkbox"]');
            checkbox.checked = true;

            // Display quantity
            updateVariantQuantityDisplay(label, qty);

            // Disable if qty > 0
            if (qty > 0) {
                checkbox.disabled = true;
                label.style.opacity = "0.7";
                label.style.cursor = "not-allowed";
            }
        }
    });

    Object.entries(sizeTextQty).forEach(([size, qty]) => {
        const label = document.querySelector(
            `#size-text-options label:has(input[value="${size}"])`,
        );
        if (label) {
            const checkbox = label.querySelector('input[type="checkbox"]');
            checkbox.checked = true;

            // Display quantity
            updateVariantQuantityDisplay(label, qty);

            // Disable if qty > 0
            if (qty > 0) {
                checkbox.disabled = true;
                label.style.opacity = "0.7";
                label.style.cursor = "not-allowed";
            }
        }
    });
}

// Calculate variant quantity for a specific attribute value
function calculateVariantQuantity(productData, value, type) {
    if (!productData.variants || productData.variants.length === 0) {
        return 0;
    }

    let totalQty = 0;

    productData.variants.forEach((variant) => {
        if (variant.AttributeValues && variant.AttributeValues.length > 0) {
            const hasValue = variant.AttributeValues.some((attr) => {
                const attrValue = attr.Name || attr.Value;
                return attrValue === value;
            });

            if (hasValue) {
                totalQty += variant.QtyAvailable || 0;
            }
        }
    });

    return totalQty;
}

// Update variant quantity display
function updateVariantQuantityDisplay(label, qty) {
    // Remove existing quantity badge if any
    const existingBadge = label.querySelector(".variant-qty-badge");
    if (existingBadge) {
        existingBadge.remove();
    }

    // Add quantity badge
    if (qty > 0) {
        const badge = document.createElement("span");
        badge.className = "variant-qty-badge";
        badge.textContent = `(${qty})`;
        label.appendChild(badge);
    }
}

// Clear all variant quantity displays
function clearVariantQuantities() {
    document
        .querySelectorAll(".variant-qty-badge")
        .forEach((badge) => badge.remove());

    // Reset label styles and enable all checkboxes
    document.querySelectorAll(".variant-options label").forEach((label) => {
        label.style.opacity = "";
        label.style.cursor = "";
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.disabled = false;
        }
    });
}

// Uncheck all variant checkboxes
function uncheckAllVariants() {
    document
        .querySelectorAll('.variant-options input[type="checkbox"]')
        .forEach((cb) => {
            cb.checked = false;
        });
}

// Filter variant options based on search
function filterVariantOptions(searchInput, columnId) {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const optionsContainer = document.getElementById(`${columnId}-options`);
    const labels = optionsContainer.querySelectorAll("label");

    labels.forEach((label) => {
        const text = label.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            label.classList.remove("hidden");
        } else {
            label.classList.add("hidden");
        }
    });
}

// Save selected variants
function saveSelectedVariants() {
    if (!currentEditingProductCode) {
        console.warn("⚠️ No product code to save variants for");
        return;
    }

    // Collect selected values (final state)
    const selectedColors = [];
    document
        .querySelectorAll('#color-options input[type="checkbox"]:checked')
        .forEach((cb) => {
            selectedColors.push(cb.value);
        });

    const selectedSizeNumbers = [];
    document
        .querySelectorAll('#size-number-options input[type="checkbox"]:checked')
        .forEach((cb) => {
            selectedSizeNumbers.push(cb.value);
        });

    const selectedSizeText = [];
    document
        .querySelectorAll('#size-text-options input[type="checkbox"]:checked')
        .forEach((cb) => {
            selectedSizeText.push(cb.value);
        });

    // Determine what changed compared to initial state
    const finalState = {
        colors: new Set(selectedColors),
        sizeNumbers: new Set(selectedSizeNumbers),
        sizeText: new Set(selectedSizeText),
    };

    const variantChanges = {
        removed: {
            colors: [],
            sizeNumbers: [],
            sizeText: [],
            variantIds: [], // IDs of variants to delete
        },
        added: {
            colors: [],
            sizeNumbers: [],
            sizeText: [],
        },
    };

    // Find removed attributes (in initial but not in final)
    if (initialVariantState) {
        initialVariantState.colors.forEach((color) => {
            if (!finalState.colors.has(color)) {
                variantChanges.removed.colors.push(color);
                // Get variant IDs that have this color
                const variantIds =
                    initialVariantState.variantIds.get(color) || [];
                variantChanges.removed.variantIds.push(...variantIds);
            }
        });

        initialVariantState.sizeNumbers.forEach((size) => {
            if (!finalState.sizeNumbers.has(size)) {
                variantChanges.removed.sizeNumbers.push(size);
                const variantIds =
                    initialVariantState.variantIds.get(size) || [];
                variantChanges.removed.variantIds.push(...variantIds);
            }
        });

        initialVariantState.sizeText.forEach((size) => {
            if (!finalState.sizeText.has(size)) {
                variantChanges.removed.sizeText.push(size);
                const variantIds =
                    initialVariantState.variantIds.get(size) || [];
                variantChanges.removed.variantIds.push(...variantIds);
            }
        });

        // Deduplicate variant IDs
        variantChanges.removed.variantIds = [
            ...new Set(variantChanges.removed.variantIds),
        ];
    }

    // Find added attributes (in final but not in initial)
    if (initialVariantState) {
        finalState.colors.forEach((color) => {
            if (!initialVariantState.colors.has(color)) {
                variantChanges.added.colors.push(color);
            }
        });

        finalState.sizeNumbers.forEach((size) => {
            if (!initialVariantState.sizeNumbers.has(size)) {
                variantChanges.added.sizeNumbers.push(size);
            }
        });

        finalState.sizeText.forEach((size) => {
            if (!initialVariantState.sizeText.has(size)) {
                variantChanges.added.sizeText.push(size);
            }
        });
    } else {
        // If no initial state, all current selections are "added"
        variantChanges.added.colors = selectedColors;
        variantChanges.added.sizeNumbers = selectedSizeNumbers;
        variantChanges.added.sizeText = selectedSizeText;
    }

    console.log("🔄 Variant changes detected:", variantChanges);

    // Log chi tiết để user thấy rõ CHỈ TẠO variants cho attributes MỚI
    if (
        variantChanges.added.colors.length > 0 ||
        variantChanges.added.sizeNumbers.length > 0 ||
        variantChanges.added.sizeText.length > 0
    ) {
        console.log("➕ SẼ TẠO variants MỚI cho:");
        if (variantChanges.added.colors.length > 0) {
            console.log("   - Màu:", variantChanges.added.colors.join(", "));
        }
        if (variantChanges.added.sizeNumbers.length > 0) {
            console.log(
                "   - Size Số:",
                variantChanges.added.sizeNumbers.join(", "),
            );
        }
        if (variantChanges.added.sizeText.length > 0) {
            console.log(
                "   - Size Chữ:",
                variantChanges.added.sizeText.join(", "),
            );
        }
    }

    if (
        variantChanges.removed.colors.length > 0 ||
        variantChanges.removed.sizeNumbers.length > 0 ||
        variantChanges.removed.sizeText.length > 0
    ) {
        console.log("🗑️ SẼ XÓA variants có:");
        if (variantChanges.removed.colors.length > 0) {
            console.log("   - Màu:", variantChanges.removed.colors.join(", "));
        }
        if (variantChanges.removed.sizeNumbers.length > 0) {
            console.log(
                "   - Size Số:",
                variantChanges.removed.sizeNumbers.join(", "),
            );
        }
        if (variantChanges.removed.sizeText.length > 0) {
            console.log(
                "   - Size Chữ:",
                variantChanges.removed.sizeText.join(", "),
            );
        }
    }

    // Kiểm tra có thay đổi thực sự không
    const hasChanges =
        variantChanges.added.colors.length > 0 ||
        variantChanges.added.sizeNumbers.length > 0 ||
        variantChanges.added.sizeText.length > 0 ||
        variantChanges.removed.colors.length > 0 ||
        variantChanges.removed.sizeNumbers.length > 0 ||
        variantChanges.removed.sizeText.length > 0;

    if (!hasChanges) {
        console.log("ℹ️ Không có thay đổi variants → KHÔNG LƯU variantChanges");
        console.log(
            '💡 Khi nhấn "Lưu thay đổi" sẽ KHÔNG GỌI API tạo/xóa variants',
        );
    } else {
        console.log("✅ Có thay đổi → Sẽ lưu variantChanges");
        console.log(
            '💡 Khi nhấn "Lưu thay đổi" sẽ CHỈ GỌI API cho các thay đổi này',
        );
    }

    // Save selections and changes to productsData for persistence (CHỈ NẾU CÓ thay đổi)
    const productData = productsData[currentEditingProductCode];
    if (productData) {
        productData.selectedVariants = {
            colors: selectedColors,
            sizeNumbers: selectedSizeNumbers,
            sizeText: selectedSizeText,
        };

        // CHỈ lưu variantChanges nếu CÓ thay đổi thực sự
        if (hasChanges) {
            productData.variantChanges = variantChanges;
        } else {
            // Nếu không có thay đổi, xóa variantChanges cũ (nếu có)
            delete productData.variantChanges;
        }

        // Save to localStorage
        saveToStorage();
    }

    // Build variant display string
    let variantText = "";
    if (selectedColors.length > 0) {
        variantText += `(${selectedColors.join(" | ")})`;
    }
    if (selectedSizeNumbers.length > 0) {
        variantText += ` (${selectedSizeNumbers.join(" | ")})`;
    }
    if (selectedSizeText.length > 0) {
        variantText += ` (${selectedSizeText.join(" | ")})`;
    }

    // Update the variants text field in edit modal
    const variantsTextField = document.getElementById("edit-variants-text");
    if (variantsTextField) {
        variantsTextField.value = variantText.trim();
    }

    // Close modal
    closeSelectVariantsModal();

    showSuccess("✅ Đã cập nhật biến thể!");
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
    const selectVariantsModal = document.getElementById("selectVariantsModal");
    if (e.target === selectVariantsModal) {
        closeSelectVariantsModal();
    }
});
