const mensagem = document.getElementById('mensagemPedido');
let itensPedido = [];

document.querySelectorAll('[data-produto]').forEach((botao) => {
    botao.addEventListener('click', () => {
        const produto = botao.dataset.produto;
        itensPedido.push(produto);
        mensagem.textContent = `Item adicionado: ${produto}. Total de itens no pedido: ${itensPedido.length}.`;
        mensagem.className = 'sucesso';
    });
});

document.getElementById('formPedido').addEventListener('submit', (evento) => {
    evento.preventDefault();
    const campos = ['nome', 'telefone', 'retirada'].map(id => document.getElementById(id));
    let valido = true;

    campos.forEach((campo) => {
        if (!campo.value.trim()) {
            campo.classList.add('erro');
            valido = false;
        } else {
            campo.classList.remove('erro');
        }
    });

    if (!valido) {
        mensagem.textContent = 'Preencha os campos obrigatórios antes de confirmar a encomenda.';
        mensagem.className = '';
        return;
    }

    if (itensPedido.length === 0) {
        mensagem.textContent = 'Adicione pelo menos um produto ao pedido antes de confirmar.';
        mensagem.className = '';
        return;
    }

    mensagem.textContent = `Encomenda confirmada para ${campos[0].value}. Retirada às ${campos[2].value}.`;
    mensagem.className = 'sucesso';
    evento.target.reset();
    itensPedido = [];
});
