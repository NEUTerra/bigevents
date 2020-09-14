const layer = layui.layer,
    form = layui.form,
    table = layui.table,
    laypage = layui.laypage;

template.defaults.imports.dateFormat = function (dateStr) {
    function padZero(n) {
        return n < 10 ? '0' + n : n;
    }
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hour = padZero(date.getHours());
    const minute = padZero(date.getMinutes());
    const second = padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
$(function () {
    let queryObj = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    function renderCates() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败！');
                }
                console.log(res.data);
                res.data.forEach(item => {
                    $('[name=cate_id]').append(`
                        <option value="${item.Id}">${item.name}</option>
                    `)
                })
                form.render('select');
            }
        })
    }

    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: queryObj,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                $('table tbody').html(template('tpl_table', res));
                renderPage(res.total);
            }
        })
    }

    // form.on('select(cate_id)', data => {
    //     queryObj.cate_id = data.value;
    // });

    // form.on('select(state)', data => {
    //     queryObj.state = data.value;
    // })

    form.on('submit(filter)', data => {
        console.log(data.field);
        queryObj.cate_id = data.field.cate_id;
        queryObj.state = data.field.state;
        initTable();
        return false;
    })

    renderCates();
    initTable();

    function renderPage(total) {
        laypage.render({
            elem: 'pagination',
            count: total,
            limits: [2, 3, 5, 10],
            limit: queryObj.pagesize,
            curr: queryObj.pagenum,
            groups: 5,
            jump: function (obj, first) {
                //首次不执行
                if (!first) {
                    queryObj.pagenum = obj.curr;
                    queryObj.pagesize = obj.limit;
                    initTable();
                }
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
        });
    }
    // $('#pagination').on('change', 'select', function () {
    //     console.log($(this).val());
    //     queryObj.pagesize = $(this).val();
    //     queryObj.pagenum = 1;
    //     initTable();
    // })
    $('table').on('click', '.delete', function () {
        const id = $(this).attr('data-id');
        const num = $('.delete').length;
        layer.confirm('是否确认删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                success: res => {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    if (num === 1) {
                        if (queryObj.pagenum !== 1) {
                            queryObj.pagenum--;
                        }
                    }
                    initTable();
                    layer.close(index);
                }
            });
        });
    })
});