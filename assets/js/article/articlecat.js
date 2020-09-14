const layer = layui.layer,
    table = layui.table,
    form = layui.form;
let indexAdd = null;
let indexEdit = null;
$(function () {
    function renderTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                const trs = template('tpl_table', res);
                $('#table tbody').html(trs);
            }
        });
    }
    renderTable();
    $('#add').on('click', function () {
        indexAdd = layer.open({
            title: '添加类别',
            type: 1,
            content: $('#tpl_add_form').html(),
            area: ['500px', '250px']
        });
    })
    $('body').on('submit', '#form_add', function (e) {
        // console.log('add...');
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('新增失败');
                }
                renderTable();
                layer.msg('新增成功');
                layer.close(indexAdd);
            }
        });
    });
    $('#table').on('click', '.edit', function () {
        const id = $(this).parents('tr').attr('data-id');
        console.log(id);
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: res => {
                console.log(res);
                indexEdit = layer.open({
                    title: '修改类别',
                    type: 1,
                    content: template('tpl_edit_form', res.data),
                    area: ['500px', '250px']
                });
            }
        })

    });
    $('body').on('submit', '#form_edit', function (e) {
        // console.log('add...');
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('修改失败');
                }
                renderTable();
                layer.msg('修改成功');
                layer.close(indexEdit);
            }
        });
    });
    $('#table').on('click', '.delete', function () {
        const id = $(this).parents('tr').attr('data-id');
        console.log(id);
        layer.confirm('是否确定删除', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: res => {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    layer.close(index);
                    renderTable();
                }
            })
        });
    });
});